from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.constants import Environment

from src.utils import Database

from src.routers import routers

import src.cron

env = Environment.Settings()

Database.Base.metadata.create_all(bind=Database.engine, checkfirst=True)

app = FastAPI(
    title=env.APP_NAME,
    version=env.APP_VERSION,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.env = env


@app.on_event("startup")
async def startup_event():  # pragma: no cover
    print("Starting up with Env")
    for key, value in app.env.model_dump().items():
        print(f"{key}: " + "*" * (len(str(value))))
    pass


@app.get("/")
async def root():  # pragma: no cover
    return {"name": app.env.APP_NAME, "version": app.env.APP_VERSION}

for router in routers.values():
    app.include_router(router)
