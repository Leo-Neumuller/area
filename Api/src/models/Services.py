import inspect
from enum import Enum
from functools import wraps
from typing import List, Callable, Dict, Optional

from pydantic import BaseModel
from sqlalchemy import Column, Integer, ForeignKey, String, PickleType
from sqlalchemy.orm import relationship, Session

from src.models.User import UserMe
from src.utils.Database import Base


class Service(Base):
    """User Model"""
    __tablename__ = "services"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    state = Column(String)
    refresh = Column(PickleType)
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="services")

    class Exception:
        class InvalidGrant(Exception):
            def __init__(self, message: str):
                self.message = message

            def __str__(self):
                return self.message

        class InvalidService(Exception):
            def __init__(self, message: str):
                self.message = message

            def __str__(self):
                return self.message


class AuthorizationUrl(BaseModel):
    """Authorization URL Model"""
    url: str

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example":
                {
                    "url": "https://accounts.google.com/o/oauth2/auth?response_type=???&client_id=???&redirect_uri=???&scope=???&state=???&access_type=???&include_granted_scopes=???"
                }
        }


class AREADataSmall(BaseModel):
    id: str
    name: str
    description: str

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example":
                {
                    "id": "???",
                    "name": "???",
                    "description": "???"
                }
        }


class ServiceType(Enum):
    action = "action"
    reaction = "reaction"


class ServicesType(BaseModel):
    action: List[str]
    reaction: List[str]


class DataConfigurationType(Enum):
    text = "text"
    number = "number"
    textMultiline = "textMultiline"
    select = "select"
    checkbox = "checkbox"


class DataConfiguration(BaseModel):
    id: str
    name: str
    inputType: DataConfigurationType
    required: bool = False
    data: List[str] = []
    streamDependencies: str | None = None


class StreamConfiguration(BaseModel):
    id: str
    name: str
    type: str


class ServiceMetadata(BaseModel):
    id: str | None = None
    name: str
    description: str
    type: ServiceType
    function: Optional[Callable] = None
    inputStreamConfiguration: List[StreamConfiguration] = []
    inputDataConfiguration: List[DataConfiguration] = []
    outputStreamConfiguration: List[StreamConfiguration] = []


class BaseService:
    """
    Base service
    """

    def __init__(self, User: UserMe | None = None, db: Session | None = None):
        """
        Base service
        """
        self.User = User
        self.db = db

    def get_interface(self) -> Dict[ServiceType, Dict[str, ServiceMetadata]]:
        """
        Get interface of service
        :return: Interface of service
        """
        data = {}
        methods = inspect.getmembers(self, predicate=inspect.ismethod)
        for name, method in methods:
            if hasattr(method, "metadata"):
                id = f"{self.__class__.__name__}_{method.metadata.type.value}_{name}"
                method.metadata.id = id
                method.metadata.function = method
                if method.metadata.type not in data:
                    data[method.metadata.type] = {}
                data[method.metadata.type][id] = method.metadata
        return data


def add_metadata(metadata: ServiceMetadata):
    """
    Add metadata to function
    :param metadata: Metadata
    """

    def decorator(func):
        """
        Decorator
        :param func: Function
        :return: Function
        """

        @wraps(func)
        def wrapper(*args, **kwargs):
            """
            Wrapper
            :param args: Args
            :param kwargs: Kwargs
            :return: Function
            """
            return func(*args, **kwargs)

        wrapper.metadata = metadata
        return wrapper

    return decorator


def save_start_authorization(service_name: str, state: str, User: UserMe, db: Session):
    """
    Save start authorization
    :param service_name: Service name
    :param state: State
    :param User: User
    :param db: Session of database
    :return: None
    """
    service = Service(
        name=service_name,
        state=state,
        user_id=User.id
    )
    db.query(Service).filter(Service.name == service_name, Service.user_id == User.id).delete()
    db.add(service)
    db.commit()
    db.refresh(service)


def check_if_service_exist(service_name: str, User: UserMe, db: Session):
    """
    Check if service exist
    :param service_name: Service name
    :param User: User
    :param db: Session of database
    :return: True if service exist else False
    """
    return db.query(Service).filter(Service.name == service_name, Service.user_id == User.id,
                                    not not Service.refresh).first() is not None


def check_if_state_is_valid(service_name: str, state: str, email: str, db: Session):
    """
    Check if state is valid
    :param service_name: Service name
    :param state: State
    :param email: Email
    :param db: Session of database
    :return: True if state is valid else False
    """
    return db.query(Service).filter(Service.name == service_name, Service.user.has(email=email),
                                    Service.state == state).first() is not None