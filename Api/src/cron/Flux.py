from src.models.Flux import Flux, FluxGraph
from src.models.Services import ServiceType
from src.models.User import UserMe
from src.services import services
from src.utils.Database import get_db


def check_signals(flux_graph: FluxGraph, datas: dict):
    """
    Check if all signals are True
    :param flux_graph: flux_graph
    :param datas: datas
    :return:
    """
    for flux_graph_prev in flux_graph.prev_flux_graph_ids:
        if "signal" in datas[flux_graph_prev] and not datas[flux_graph_prev]["signal"]:
            return False
    return True


def run_reaction(User, already_executed, datas, db, flux_graph):
    """
    Run reaction
    :param User:
    :param already_executed:
    :param datas:
    :param db:
    :param flux_graph:
    :return:
    """
    splitted_service_id = flux_graph.service_id.split('_')
    interface = \
        services[splitted_service_id[0]](User, db).get_interface()[ServiceType(splitted_service_id[1])][
            flux_graph.service_id]
    # TODO add variable from prev_data
    datas[flux_graph.id] = interface.function(flux_graph.config)
    already_executed.add(flux_graph.id)
    return


def run_dependent_flux(flux_graph: FluxGraph, datas: dict, already_executed: set, User: UserMe, all_AREA_by_id: dict,
                       db=next(get_db())):
    """
    Run dependent flux
    :param flux_graph:
    :param datas:
    :param already_executed:
    :param User:
    :param all_AREA_by_id:
    :param db:
    :return:
    """
    if flux_graph.id in already_executed:
        return
    if not check_signals(flux_graph, datas):
        datas[flux_graph.id] = {"signal": False}
        already_executed.add(flux_graph.id)
        return
    for flux_graph_prev in flux_graph.prev_flux_graph_ids:
        run_dependent_flux(all_AREA_by_id[flux_graph_prev], datas, already_executed, User, all_AREA_by_id, db)
    run_reaction(User, already_executed, datas, db, flux_graph)
    return


def run_next_flux(flux_graph: FluxGraph, datas: dict, already_executed: set, User: UserMe, all_AREA_by_id: dict,
                  db=next(get_db())):
    """
    Run next flux
    :param flux_graph:
    :param datas:
    :param already_executed:
    :param User:
    :param db:
    :return:
    """
    if flux_graph.id in already_executed:
        return
    run_dependent_flux(flux_graph, datas, already_executed, User, all_AREA_by_id, db)
    if not datas[flux_graph.id]["signal"]:
        return
    for flux_graph_next in flux_graph.next_flux_graph_ids:
        run_next_flux(all_AREA_by_id[flux_graph_next], datas, already_executed, User, all_AREA_by_id, db)
    run_reaction(User, already_executed, datas, db, flux_graph)
    return


def execute_flux(db=next(get_db())):
    all_flux = db.query(Flux).all()
    all_flux_ids = {i.id: i for i in all_flux}
    for flux_id in all_flux_ids:
        error = False
        if not all_flux_ids[flux_id].active or not all_flux_ids[flux_id].checked:
            continue
        all_AREA = db.query(FluxGraph).filter(FluxGraph.flux_id == flux_id).all()
        if len(all_AREA) == 0:
            continue
        User = UserMe(
            id=all_flux_ids[flux_id].user_id,
            email=all_flux_ids[flux_id].user.email,
            surname=all_flux_ids[flux_id].user.surname,
            name=all_flux_ids[flux_id].user.name
        )
        AREA_actions_ids = all_AREA[0].action_ids
        datas = {i.id: {} for i in all_AREA}
        all_AREA_by_id = {i.id: i for i in all_AREA}
        already_executed = set()
        for AREA in all_AREA:
            if AREA.id in AREA_actions_ids:
                splitted_service_id = AREA.service_id.split('_')
                try:
                    interface = \
                        services[splitted_service_id[0]](User, db).get_interface()[ServiceType(splitted_service_id[1])][
                            AREA.service_id]
                    prev_data, datas[AREA.id] = interface.function(AREA.prev_data, AREA.config)
                except Exception as e:
                    error = True
                    break
                db.query(FluxGraph).filter(FluxGraph.id == AREA.id).update({"prev_data": prev_data})
                already_executed.add(AREA.id)
        if error:
            print(f"Flux {flux_id} not executed")
            continue
        db.commit()
        for action_id in AREA_actions_ids:
            for REA in all_AREA_by_id[action_id].next_flux_graph_ids:
                run_next_flux(all_AREA_by_id[REA], datas, already_executed, User, all_AREA_by_id, db)
        print(f"Flux {flux_id} executed")

    print("All flux executed")
