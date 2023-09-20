from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.constants import Environment

env = Environment.Settings()

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
    for key, value in app.env.dict().items():
        print(f"{key}: ***")
    pass


@app.get("/")
async def root():
    return {"name": app.env.APP_NAME, "version": app.env.APP_VERSION}
