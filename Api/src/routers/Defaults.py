"""
Defaults router
"""

import os

from fastapi import status, APIRouter, Request, HTTPException
from fastapi.responses import FileResponse

from src.models.Services import ServiceType
from src.services import services
from src.models.About import About, Client, Server, Service, Action, Reaction
from datetime import datetime

DefaultsRouter = APIRouter(
    tags=["Default"],
)


@DefaultsRouter.get("/about.json",
                    summary="About",
                    description="About",
                    response_description="About",
                    status_code=status.HTTP_200_OK,
                    response_model=About)
async def about(request: Request):
    """
    About
    :return: About
    """
    services_data = []
    for service in services.keys():
        new_service = Service(
            name=services[service].get_name(),
            actions=[],
            reactions=[]
        )
        for service_type in services[service]().get_interface().keys():
            for service_name in services[service]().get_interface()[service_type].keys():
                if service_type == ServiceType.action:
                    new_service.actions.append(
                        Action(
                            name=services[service]().get_interface()[service_type][service_name].name,
                            description=services[service]().get_interface()[service_type][service_name].description
                        )
                    )
                else:
                    new_service.reactions.append(
                        Reaction(
                            name=services[service]().get_interface()[service_type][service_name].name,
                            description=services[service]().get_interface()[service_type][service_name].description
                        )
                    )
        services_data.append(new_service)
    return About(
        client=Client(
            host=request.client.host if "client" in dir(request) and "host" in dir(request.client) else "Undefined",
        ),
        server=Server(
            current_time=int(datetime.now().timestamp()),
            services=services_data
        )

    )


@DefaultsRouter.get("/client.apk",
                    summary="Client apk",
                    description="Client apk",
                    response_description="Client",
                    status_code=status.HTTP_200_OK,
                    response_class=FileResponse)
async def client(request: Request):
    """
    Client
    :return: Client
    """
    if os.path.exists("client.apk"):
        return FileResponse("client.apk")
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")
