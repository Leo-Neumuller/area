from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.constants import Environment

from src.utils import Database
from src.routers import User

env = Environment.Settings()

Database.Base.metadata.create_all(bind=Database.engine)

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
    pass


@app.get("/")
async def root():
    return {"name": app.env.APP_NAME, "version": app.env.APP_VERSION}

app.include_router(User.UsersRouter)
