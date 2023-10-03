from fastapi import status, APIRouter, Request
from src.services import services
from src.models.About import About, Client, Server
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
    return About(
        client=Client(
            host=request.get("client", {}).get("host", "Undefined"),
        ),
        server=Server(
            current_time=int(datetime.now().timestamp()),
            services=[service.get_description() for service in services.values()]
        )

    )
