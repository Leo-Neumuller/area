import os
os.environ['OAUTHLIB_RELAX_TOKEN_SCOPE'] = '1'
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.constants import Environment

from src.utils import Database

from src.routers import routers

import json

from src.utils.Helper import inTestMode

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
async def startup_event():
    print("Starting up with Env")
    for key, value in app.env.model_dump().items():
        print(f"{key}: " + "*" * (len(str(value))))
    if "DOC" in os.environ:
        print("Updating openapi.json")
        with open("./docs/openapi.json", 'w+') as fp:
            json.dump(app.openapi(), fp)
    pass


@app.get("/")
async def root():
    return {"name": app.env.APP_NAME, "version": app.env.APP_VERSION}


for router in routers.values():
    app.include_router(router)

if not inTestMode(): # pragma: no cover
    import src.cron
