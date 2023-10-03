from fastapi import APIRouter, HTTPException, status, Depends

from src.middleware.User import MiddlewareUser
from src.models.Services import save_start_authorization, check_if_service_exist, AuthorizationUrl, Service
from src.models.User import UserMe
from src.services import services
from src.utils.Database import get_db
from src.utils.Helper import DefaultErrorResponse

ServicesRouter = APIRouter(
    tags=["Services"],
)


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
