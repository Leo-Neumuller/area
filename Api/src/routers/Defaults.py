from fastapi import status, APIRouter, Request

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
            name=service,
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
                            name=service_name,
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
