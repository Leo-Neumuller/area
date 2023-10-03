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


def save_start_authorization(service_name: str, state: str, User: UserMe, db: Session):
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
    return db.query(Service).filter(Service.name == service_name, Service.user_id == User.id,
                                    not not Service.refresh).first() is not None


def check_if_state_is_valid(service_name: str, state: str, email: str, db: Session):
    return db.query(Service).filter(Service.name == service_name, Service.user.has(email=email),
                                    Service.state == state).first() is not None

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
