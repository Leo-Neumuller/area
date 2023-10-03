from typing import List

from fastapi import APIRouter, HTTPException, status, Depends

from src.middleware.User import MiddlewareUser
from src.models.Services import save_start_authorization, check_if_service_exist, AuthorizationUrl, Service, \
    ServicesType, ServiceType, AREADataSmall, ServiceMetadata
from src.models.User import UserMe
from src.services import services
from src.utils.Database import get_db
from src.utils.Helper import DefaultErrorResponse

ServicesRouter = APIRouter(
    tags=["Services"],
)


@ServicesRouter.get("/services",
                    summary="Services",
                    description="Get services",
                    response_description="Services",
                    status_code=status.HTTP_200_OK,
                    response_model=ServicesType,
                    dependencies=[Depends(MiddlewareUser.check)],
                    responses={**MiddlewareUser.responses()})
async def get_services():
    """
    Get services
    :return: Services
    """
    return ServicesType(
        action=[service for service in services.keys() if
                ServiceType.action in services[service]().get_interface().keys()],
        reaction=[service for service in services.keys() if
                  ServiceType.reaction in services[service]().get_interface().keys()]
    )


@ServicesRouter.get("/metadata/{AREA_id}",
                    summary="Get action or reaction input schema",
                    description="Get action or reaction input schema",
                    response_description="Action or reaction schema",
                    response_model=ServiceMetadata,
                    status_code=status.HTTP_200_OK,
                    dependencies=[Depends(MiddlewareUser.check)],
                    responses={**MiddlewareUser.responses(),
                               status.HTTP_404_NOT_FOUND: {"description": "Service not found",
                                                           **DefaultErrorResponse()}})
async def get_action_or_reaction(AREA_id: str):
    """
    Get action
    :return: Action
    """
    splitted_reaction_id = AREA_id.split("_")
    if len(splitted_reaction_id) < 2:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service Schema not found")
    service_name = splitted_reaction_id[0]
    try:
        action = ServiceType(splitted_reaction_id[1])
    except ValueError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service Schema not found")
    if service_name not in services.keys():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service Schema not found")
    interface = services[service_name]().get_interface()[action]
    if AREA_id not in interface.keys():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"This service doesn't have {action.value}")
    data = interface[AREA_id]
    data.function = None
    return data


@ServicesRouter.get("/{service}/authorize_url",
                    summary="Authorization URL",
                    description="Get authorization url",
                    response_description="Authorization URL",
                    status_code=status.HTTP_200_OK,
                    response_model=AuthorizationUrl,
                    dependencies=[Depends(MiddlewareUser.check)],
                    responses={**MiddlewareUser.responses(),
                               status.HTTP_404_NOT_FOUND: {"description": "Service not found",
                                                           **DefaultErrorResponse()},
                               status.HTTP_409_CONFLICT: {"description": "Service already exist",
                                                          **DefaultErrorResponse()}})
async def authorize_url(service: str, User: UserMe = Depends(MiddlewareUser.check), db=Depends(get_db)):
    """
    Get authorization url
    :return: Authorize URL
    """
    if service not in services:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")
    if check_if_service_exist(service, User, db):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Service already exist")
    authorization_url = services[service].get_authorization_url(User, db)
    return AuthorizationUrl(url=authorization_url)


@ServicesRouter.get("/{service}/authorize",
                    summary="Authorize",
                    description="Authorize",
                    response_description="Authorize",
                    status_code=200)
async def authorize(service: str, state: str, code: str, scope: str, error: str = None, db=Depends(get_db)):
    """
    Authorize
    :return: Authorize
    """
    if service not in services:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")
    if error is not None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Access denied")
    try:
        services[service].authorize(state, code, scope.split(), db)
    except Service.Exception.InvalidGrant as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid grant")
    return {"service": service}


@ServicesRouter.get("/{service}/{type}",
                    summary="Get all actions or reactions",
                    description="Get all actions or reactions",
                    response_description="List of actions or reactions",
                    status_code=status.HTTP_200_OK,
                    response_model=List[AREADataSmall],
                    dependencies=[Depends(MiddlewareUser.check)],
                    responses={**MiddlewareUser.responses(),
                               status.HTTP_404_NOT_FOUND: {"description": "Service not found",
                                                           **DefaultErrorResponse()}})
async def get_actions_or_reactions(service: str, serviceType: ServiceType):
    """
    Get action
    :return: Action
    """
    if service not in services:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")
    interface = services[service]().get_interface()
    if serviceType not in interface.keys():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"This service doesn't have {serviceType.value}")
    return [AREADataSmall(
        id=interface[serviceType][action].id,
        name=interface[serviceType][action].name,
        description=interface[serviceType][action].description,
    ) for action in interface[serviceType].keys()]
