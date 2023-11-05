"""
Flux routers
"""

from typing import List

from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session

from src.middleware.User import MiddlewareUser
from src.models.Flux import FluxCreateOrModify, create_or_modify_flux, FluxSend, Flux, get_flux_by_id, check_flux, \
    get_all_fluxs, FluxBasicData, recreate_flux_graph, FluxToggleSend, delete_flux_with_id
from src.models.User import UserMe
from src.utils.Database import get_db
from src.utils.Helper import DefaultErrorResponse

FluxRouters = APIRouter(
    prefix="/flux",
    tags=["Flux"],
)


@FluxRouters.post("",
                  summary="Create/Modify flux",
                  description="Create/Modify flux",
                  response_description="Flux",
                  response_model=FluxSend,
                  status_code=status.HTTP_201_CREATED,
                  dependencies=[Depends(MiddlewareUser.check)],
                  responses={**MiddlewareUser.responses(),
                             status.HTTP_400_BAD_REQUEST: {"description": "Bad Request",
                                                           **DefaultErrorResponse()}})
async def create_flux(CreateFlux: FluxCreateOrModify, verify: bool = False,
                      User: UserMe = Depends(MiddlewareUser.check),
                      db: Session = Depends(get_db)):
    """
    Create flux
    :return: Flux
    """
    active, checked = False, False
    if verify:
        errors = check_flux(CreateFlux)
        if len(errors) > 0:
            errors = [dict(i) for i in errors]
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=errors)
        active, checked = True, True
    try:
        flux = create_or_modify_flux(CreateFlux, User, db, active, checked)
    except Flux.Exception.NotFoundException as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    if verify:
        recreate_flux_graph(flux, db)
    return FluxSend(id=flux.id)


@FluxRouters.delete("/{fluxId}",
                    summary="Delete flux",
                    description="Delete flux",
                    response_description="Flux",
                    response_model=FluxSend,
                    status_code=status.HTTP_200_OK,
                    dependencies=[Depends(MiddlewareUser.check)],
                    responses={**MiddlewareUser.responses(),
                               status.HTTP_404_NOT_FOUND: {"description": "Flux not found",
                                                           **DefaultErrorResponse()}})
async def delete_flux(fluxId: int, User: UserMe = Depends(MiddlewareUser.check), db: Session = Depends(get_db)):
    """
    Delete flux
    :return: Flux
    """
    try:
        delete_flux_with_id(fluxId, User, db)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    return FluxSend(id=fluxId)


@FluxRouters.get("/fluxs",
                 summary="Get all fluxs",
                 description="Get all fluxs",
                 response_description="List of fluxs",
                 response_model=List[FluxBasicData],
                 status_code=status.HTTP_200_OK,
                 dependencies=[Depends(MiddlewareUser.check)],
                 responses={**MiddlewareUser.responses()}
                 )
async def get_fluxs(User: UserMe = Depends(MiddlewareUser.check), db: Session = Depends(get_db)):
    """
    Get fluxs
    :return: Fluxs
    """
    return get_all_fluxs(User, db)


@FluxRouters.get("/{fluxId}",
                 summary="Get flux",
                 description="Get flux",
                 response_description="Flux",
                 status_code=status.HTTP_200_OK,
                 response_model=FluxCreateOrModify,
                 dependencies=[Depends(MiddlewareUser.check)],
                 responses={**MiddlewareUser.responses(),
                            status.HTTP_404_NOT_FOUND: {"description": "Flux not found",
                                                        **DefaultErrorResponse()}})
async def get_flux(fluxId: int, User: UserMe = Depends(MiddlewareUser.check), db: Session = Depends(get_db)):
    """
    Get flux
    :return: Flux
    """
    try:
        flux = get_flux_by_id(fluxId, User, db)
    except Flux.Exception.NotFoundException as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    return FluxCreateOrModify(
        id=flux.id,
        name=flux.name,
        description=flux.description,
        nodes=flux.frontEndData["nodes"],
        edges=flux.frontEndData["edges"]
    )


@FluxRouters.patch("/{fluxId}",
                   summary="Toggle active flux",
                   description="Toggle active flux",
                   response_description="Toggle works",
                   status_code=status.HTTP_200_OK,
                   response_model=FluxToggleSend,
                   dependencies=[Depends(MiddlewareUser.check)],
                   responses={**MiddlewareUser.responses(),
                              status.HTTP_404_NOT_FOUND: {"description": "Flux not found",
                                                          **DefaultErrorResponse()}})
async def toggle_flux(fluxId: int, User: UserMe = Depends(MiddlewareUser.check), db: Session = Depends(get_db)):
    """
    Toggle active flux
    :return: Flux
    """
    try:
        flux = get_flux_by_id(fluxId, User, db)
    except Flux.Exception.NotFoundException as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    flux.active = not flux.active
    db.commit()
    return FluxToggleSend(id=flux.id, active=flux.active)
