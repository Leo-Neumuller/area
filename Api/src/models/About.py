"""
About model and utils
"""

from pydantic import BaseModel


class Client(BaseModel):
    host: str


class Action(BaseModel):
    name: str
    description: str


class Reaction(BaseModel):
    name: str
    description: str


class Service(BaseModel):
    name: str
    actions: list[Action]
    reactions: list[Reaction]


class Server(BaseModel):
    current_time: int
    services: list[Service]


class About(BaseModel):
    client: Client
    server: Server
