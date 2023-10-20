from copy import copy
from typing import List, Any, Optional

from pydantic import BaseModel
from sqlalchemy import String, Column, Integer, PickleType, ForeignKey, Boolean
from sqlalchemy.orm import relationship, Session

from src.models.Services import ServiceType
from src.models.User import UserMe
from src.services import services
from src.utils.Database import Base, get_db


class FluxGraph(Base):
    """Flux Graph Model"""
    __tablename__ = "flux_graph"
    id = Column(Integer, primary_key=True, index=True)
    flux_id = Column(Integer, ForeignKey("flux.id"))
    prev_data = Column(PickleType, nullable=True)
    config = Column(PickleType)
    service_id = Column(String)
    action_ids = Column(PickleType)
    prev_flux_graph_ids = Column(PickleType, nullable=True)
    next_flux_graph_ids = Column(PickleType, nullable=True)

    flux = relationship("Flux", back_populates="flux_graph")

    def delete_all(self, db: Session = next(get_db())) -> None:
        """
        Delete all
        :param db: Session of database
        :return: None
        """
        db.query(FluxGraph).filter(FluxGraph.flux_id == self.flux_id).delete()
        db.commit()

    def __repr__(self):
        return f"\n<FluxGraph(\n\tid={self.id},\n\tflux_id={self.flux_id},\n\tprev_data={self.prev_data},\n\tconfig={self.config},\n\t" \
                f"service_id={self.service_id},\n\taction_ids={self.action_ids},\n\tprev_flux_graph_ids={self.prev_flux_graph_ids},\n\t" \
                f"next_flux_graph_ids={self.next_flux_graph_ids}\n)> "


class Flux(Base):
    """Flux Model"""
    __tablename__ = "flux"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    active = Column(Boolean, default=False)
    checked = Column(Boolean, default=False)
    description = Column(String)
    frontEndData = Column(PickleType)

    user_id = Column(Integer, ForeignKey("users.id"))

    flux_graph = relationship("FluxGraph", back_populates="flux")
    user = relationship("User", back_populates="flux")

    class Exception:
        class NotFoundException(Exception):
            def __init__(self, message: str):
                self.message = message

            def __str__(self):
                return self.message


class FluxPos(BaseModel):
    """Flux Position Model"""
    x: float
    y: float


class FluxInputData(BaseModel):
    """Flux Input Data Model"""
    id: str
    name: str
    data: List[str]
    inputType: str
    type: str
    required: bool
    value: Optional[Any] = None


class FluxNode(BaseModel):
    """Flux Node Model"""
    id: str
    numberInputs: int | str
    numberOutputs: int | str
    service: Optional[str] = None
    subService: Optional[str] = None
    subServiceId: Optional[str] = None
    inputDataFromSubServiceId: Optional[str] = None
    inputsData: Optional[List[FluxInputData]] = []

    prevPosition: FluxPos
    currPosition: FluxPos

    type: str
    inputEdgeIds: List[str]
    outputEdgeIds: List[str]

    title: str
    img: str


class FluxEdge(BaseModel):
    """Flux Edge Model"""
    id: str
    nodeStartId: str
    nodeEndId: str
    inputIndex: int
    outputIndex: int

    prevStartPos: FluxPos
    currStartPos: FluxPos
    prevEndPos: FluxPos
    currEndPos: FluxPos


class FluxCreateOrModify(BaseModel):
    """Flux Create Model"""
    id: Optional[int] = None
    name: str
    description: str

    nodes: List[FluxNode]
    edges: List[FluxEdge]


class FluxSend(BaseModel):
    """Flux Send Model"""
    id: int


class FluxError(BaseModel):
    """Flux Error Model"""
    id: str
    relatedNodeIds: List[str] = []
    relatedEdgeIds: List[str] = []
    relatedInputDataIds: List[str] = []
    error: str


class FluxBasicData(BaseModel):
    """Flux Basic Data Model"""
    id: int
    name: str
    description: str
    active: bool


# TODO: add check for all input data type
flux_check_input_data_type = {
    "string": lambda x: x == "" and type(x) == str,
}


def check_loop_in_edges(edges: List[FluxEdge]) -> bool:
    """
    Check if there is a loop in edges
    :param edges: Edges
    :return: True if there is a loop
    """
    edges_dict_by_node = {}
    for edge in edges:
        if edge.nodeStartId not in edges_dict_by_node.keys():
            edges_dict_by_node[edge.nodeStartId] = []
        edges_dict_by_node[edge.nodeStartId].append(edge)

    def dfs(node, path):
        """
        Depth first search
        :param node: Node
        :param path: Path
        :return: Loop edges
        """
        if node in path:
            loop_edges = set()
            for i in range(len(path) - 1):
                start_node = path[i]
                end_node = path[i + 1]
                for e in edges_dict_by_node[start_node]:
                    if e.nodeEndId == end_node:
                        loop_edges.add(e.id)
                        break
            start_node = path[-1]
            end_node = path[0]
            for e in edges_dict_by_node[start_node]:
                if e.nodeEndId == end_node:
                    loop_edges.add(e.id)
                    break
            return list(loop_edges)

        if node in edges_dict_by_node:
            for edge in edges_dict_by_node[node]:
                new_path = path + [node]
                result = dfs(edge.nodeEndId, new_path)
                if result:
                    return result

        return None

    for edge in edges:
        loop = dfs(edge.nodeStartId, [])
        if loop:
            return loop


def check_flux(CreateFlux: FluxCreateOrModify) -> List[FluxError]:
    """
    Check flux
    :param CreateFlux: Flux
    :return: Errors
    """
    Errors = []
    if len(CreateFlux.nodes) < 2:
        return [FluxError(id="global_flux_min_2_node", error="un flux doit avoir au moins 2 noeuds")]
    nodes_id = []
    for node in CreateFlux.nodes:
        nodes_id.append(node.id)
        if node.service is None or node.subService is None or node.subServiceId is None:
            Errors.append(
                FluxError(id="node_must_have_service", relatedNodeIds=[node.id],
                          error="Le noeud doit avoir un service"))
            continue
        splitted_sub_service_id = node.subServiceId.split("_")
        if len(splitted_sub_service_id) <= 3 or splitted_sub_service_id[0] not in services.keys() or \
                splitted_sub_service_id[1] not in ["action", "reaction"] or node.subServiceId not in \
                services[splitted_sub_service_id[0]]().get_interface()[ServiceType(splitted_sub_service_id[1])].keys():
            Errors.append(
                FluxError(id="node_service_not_found", relatedNodeIds=[node.id], error="Le noeud a un service érroné"))
            continue
        if (node.numberInputs != "" and node.numberInputs != "0" and node.numberInputs != 0) and splitted_sub_service_id[1] == "action":
            Errors.append(FluxError(id="node_service_action_with_inputs", relatedNodeIds=[node.id],
                                    error="Un noeud action ne peut pas avoir d'entrée"))
        if node.outputEdgeIds == [] and splitted_sub_service_id[1] == "action":
            Errors.append(FluxError(id="node_service_action_without_output", relatedNodeIds=[node.id],
                                    error="Un noeud action doit avoir au moins une sortie"))
        interface = services[splitted_sub_service_id[0]]().get_interface()[ServiceType(splitted_sub_service_id[1])][
            node.subServiceId]
        interface_inputs_id = [inputData.id for inputData in interface.inputsData]
        for inputData in node.inputsData:
            if inputData.id not in interface_inputs_id:
                Errors.append(FluxError(id="node_input_data_not_found", relatedNodeIds=[node.id],
                                        relatedInputDataIds=[inputData.id],
                                        error="Donnée d'entrée inconnue"))
                continue
            if not isinstance(inputData.value, dict):
                if inputData.required and (
                        inputData.value is None or flux_check_input_data_type[inputData.type](inputData.value)):
                    Errors.append(FluxError(id="node_input_data_required", relatedNodeIds=[node.id],
                                            relatedInputDataIds=[inputData.id],
                                            error="Donnée d'entrée requise"))
                    continue
            else:
                # TODO: check dict data is in another node output
                pass
            if inputData.inputType == "select" and inputData.value not in inputData.data:
                Errors.append(FluxError(id="node_input_data_select_not_found", relatedNodeIds=[node.id],
                                        relatedInputDataIds=[inputData.id],
                                        error="Donnée d'entrée select inconnue"))
                continue

    nodes_alone_id = copy(nodes_id)
    for edge in CreateFlux.edges:
        if edge.nodeStartId not in nodes_id or edge.nodeEndId not in nodes_id:
            Errors.append(
                FluxError(id="edge_not_found_node", relatedEdgeIds=[edge.id], error="Lien avec noeud(s) inconnu(s)"))
            continue
        if edge.nodeStartId == edge.nodeEndId:
            Errors.append(FluxError(id="edge_same_node", relatedEdgeIds=[edge.id], error="Lien avec le même noeud"))
            continue
        if edge.nodeStartId in nodes_alone_id:
            nodes_alone_id.remove(edge.nodeStartId)
        if edge.nodeEndId in nodes_alone_id:
            nodes_alone_id.remove(edge.nodeEndId)
    if len(nodes_alone_id) > 0:
        Errors.append(FluxError(id="node_without_edge", relatedNodeIds=nodes_alone_id, error="Noeud(s) seul(s)"))
    loop_edges_ids = check_loop_in_edges(CreateFlux.edges)
    if loop_edges_ids and len(loop_edges_ids) > 0:
        Errors.append(FluxError(id="loop_in_edges", relatedEdgeIds=loop_edges_ids, error="Boucle(s) dans le flux"))
    return Errors


def recreate_flux_graph(flux: Flux, db: Session):
    """
    Recreate flux graph
    :param flux: Flux
    :param db: Session of database
    :return: Flux graph
    """
    db.query(FluxGraph).filter(FluxGraph.flux_id == flux.id).delete()
    db.commit()
    nodes = {}
    actions = {}
    for node in flux.frontEndData["nodes"]:
        splitted_sub_service_id = node.subServiceId.split("_")
        if splitted_sub_service_id[1] == "action":
            interface = services[splitted_sub_service_id[0]]().get_interface()[ServiceType.action][node.subServiceId]
            sub_flux = FluxGraph(
                flux_id=flux.id,
                prev_data={
                    key: interface.prev_data[key]() for key in interface.prev_data
                },
                config={
                    inputData.id: inputData.value for inputData in node.inputsData
                },
                service_id=node.subServiceId,
                action_ids=[],
                prev_flux_graph_ids=None,
                next_flux_graph_ids=[],
            )
            db.add(sub_flux)
            nodes[node.id] = sub_flux
            actions[node.id] = sub_flux
        else:
            sub_flux = FluxGraph(
                flux_id=flux.id,
                prev_data=None,
                config={
                    inputData.id: inputData.value for inputData in node.inputsData
                },
                service_id=node.subServiceId,
                action_ids=[],
                prev_flux_graph_ids=[],
                next_flux_graph_ids=[],
            )
            db.add(sub_flux)
            nodes[node.id] = sub_flux
    db.commit()
    actions_ids = [action.id for action in actions.values()]
    for action in nodes.values():
        action.action_ids = actions_ids
    db.commit()
    nodes_prev = {node.id: [] for node in flux.frontEndData["nodes"]}
    nodes_next = {node.id: [] for node in flux.frontEndData["nodes"]}
    for node in flux.frontEndData["nodes"]:
        for edge in flux.frontEndData["edges"]:
            if edge.nodeStartId == node.id and nodes[edge.nodeEndId].id not in nodes[node.id].next_flux_graph_ids:
                nodes_next[node.id] += [nodes[edge.nodeEndId].id]
            if edge.nodeEndId == node.id and nodes[edge.nodeStartId].id not in nodes[node.id].prev_flux_graph_ids:
                nodes_prev[node.id] += [nodes[edge.nodeStartId].id]
    for node in flux.frontEndData["nodes"]:
        nodes[node.id].prev_flux_graph_ids = nodes_prev[node.id]
        nodes[node.id].next_flux_graph_ids = nodes_next[node.id]
    db.commit()
    data = db.query(FluxGraph).filter(FluxGraph.flux_id == flux.id).all()
    print(data)




def get_flux_by_id(fluxId: int, User: UserMe, db: Session):
    """
    Get flux by id
    :param fluxId: Flux id
    :param User: User
    :param db: Session of database
    :return: Flux
    """
    flux = db.query(Flux).filter(Flux.id == fluxId, Flux.user_id == User.id).first()
    if flux is None:
        raise Flux.Exception.NotFoundException("Flux not found")
    return flux


def create_or_modify_flux(FluxCorM: FluxCreateOrModify, User: UserMe, db: Session, active: bool = False,
                          checked: bool = False) -> Flux:
    """
    Create or modify flux
    :param FluxCorM: Flux
    :param User: User
    :param db: Session of database
    :return: Flux
    """
    flux = None
    if FluxCorM.id is not None:
        try:
            flux = get_flux_by_id(FluxCorM.id, User, db)
        except Flux.Exception.NotFoundException as e:
            pass
    if flux is not None:
        flux.name = FluxCorM.name
        flux.description = FluxCorM.description
        flux.frontEndData = {
            "nodes": list(FluxCorM.nodes),
            "edges": list(FluxCorM.edges)
        }
        flux.checked = checked
        flux.active = active
        db.commit()
        db.refresh(flux)
        return flux
    flux = Flux(
        name=FluxCorM.name,
        description=FluxCorM.description,
        active=active,
        checked=checked,
        frontEndData={
            "nodes": list(FluxCorM.nodes),
            "edges": list(FluxCorM.edges)
        },
        user_id=User.id
    )
    db.add(flux)
    db.commit()
    db.refresh(flux)
    return flux


def get_all_fluxs(User: UserMe, db: Session) -> List[FluxBasicData]:
    """
    Get all fluxs
    :param User: User
    :param db: Session of database
    :return: Fluxs
    """
    fluxs = db.query(Flux).filter(Flux.user_id == User.id).all()
    fluxs_basic_data = []
    for flux in fluxs:
        fluxs_basic_data.append(FluxBasicData(
            id=flux.id,
            name=flux.name,
            description=flux.description,
            active=flux.active
        ))
    return fluxs_basic_data
