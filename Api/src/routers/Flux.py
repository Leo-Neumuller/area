from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session

from src.middleware.User import MiddlewareUser
from src.models.Flux import FluxCreateOrModify, create_or_modify_flux, FluxSend, Flux, get_flux_by_id
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
async def create_flux(CreateFlux: FluxCreateOrModify, User: UserMe = Depends(MiddlewareUser.check),
                      db: Session = Depends(get_db)):
    """
    Create flux
    :return: Flux
    """
    try:
        flux = create_or_modify_flux(CreateFlux, User, db)
    except Flux.Exception.NotFoundException as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    return FluxSend(id=flux.id)


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

