from typing import List, Any, Optional

from pydantic import BaseModel
from sqlalchemy import String, Column, Integer, PickleType, ForeignKey, Boolean
from sqlalchemy.orm import relationship, Session

from src.models.User import UserMe
from src.utils.Database import Base, get_db


class Flux(Base):
    __tablename__ = "flux"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    active = Column(Boolean, default=False)
    description = Column(String)
    frontEndData = Column(PickleType)

    user_id = Column(Integer, ForeignKey("users.id"))

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
    numberInputs: Optional[int] = None
    numberOutputs: Optional[int] = None
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
    id: int


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


def create_or_modify_flux(FluxCorM: FluxCreateOrModify, User: UserMe, db: Session):
    """
    Create or modify flux
    :param FluxCorM: Flux
    :param User: User
    :param db: Session of database
    :return: Flux
    """
    if FluxCorM.id is not None:
        flux = get_flux_by_id(FluxCorM.id, User, db)
        flux.name = FluxCorM.name
        flux.description = FluxCorM.description
        flux.frontEndData = {
            "nodes": list(FluxCorM.nodes),
            "edges": list(FluxCorM.edges)
        }
        db.commit()
        db.refresh(flux)
        return flux
    flux = Flux(
        name=FluxCorM.name,
        description=FluxCorM.description,
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