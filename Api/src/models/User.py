"""
User Model and utils
"""

import sqlalchemy
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import Session, relationship
from fastapi import status

from src.utils.Database import Base
from src.utils.Crypt import get_password_hash, verify_password
from src.utils.Helper import DefaultErrorResponse
from src.utils.RegexChecker import check_email, check_password


class User(Base):
    """User Model"""
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    surname = Column(String)
    name = Column(String)

    flux = relationship("Flux", back_populates="user")
    services = relationship("Service", back_populates="user")

    class Exception(Exception):
        def __init__(self, message: str):
            self.message = message

        def __str__(self):
            return self.message

    class NotFoundException(Exception):
        def __init__(self, message: str):
            self.message = message

        def __str__(self):
            return self.message

    def __repr__(self):  # pragma: no cover
        return f"<User(id={self.id}, email={self.email}, password={self.password}, surname={self.surname}, name={self.name})>"


class UserCreate(BaseModel):
    """User Create Model"""
    email: str
    password: str
    surname: str
    name: str

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example":
                {
                    "email": "test@test.com",
                    "password": "Test1234",
                    "surname": "Test",
                    "name": "Test"
                }
        }


class UserToken(BaseModel):
    """User Token Model"""
    access_token: str


class UserCreateException(Exception):
    """User Exception"""

    def __init__(self, message: str, status_code: int = status.HTTP_400_BAD_REQUEST):
        self.message = message
        self.code = status_code

    def __str__(self):
        return self.message

    @staticmethod
    def responses():
        return {
            status.HTTP_400_BAD_REQUEST: {"description": "Bad Request", **DefaultErrorResponse()},
            status.HTTP_409_CONFLICT: {"description": "Conflict", **DefaultErrorResponse()},
        }


def create_user(db: Session, user: UserCreate) -> User:
    """
    Create user
    :param db: Session of database
    :param user: User to create
    :return: Created user
    """
    if check_email(user.email) is False:
        raise UserCreateException("L'Email n'est pas valide", status_code=status.HTTP_400_BAD_REQUEST)
    if check_password(user.password) is False:
        raise UserCreateException(
            "Le mot de passe n'est pas valide. Il doit contenir huit caractères, au moins une lettre majuscule, une lettre minuscule et un chiffre.",
            status_code=status.HTTP_400_BAD_REQUEST)
    if len(user.surname) == 0:
        raise UserCreateException("Le Nom est vide", status_code=status.HTTP_400_BAD_REQUEST)
    if len(user.name) == 0:
        raise UserCreateException("Le Prénom est vide", status_code=status.HTTP_400_BAD_REQUEST)
    hashed_password = get_password_hash(user.password)
    db_user = User(email=user.email, password=hashed_password, surname=user.surname, name=user.name)
    db.add(db_user)
    try:
        db.commit()
    except sqlalchemy.exc.IntegrityError:
        db.rollback()
        raise UserCreateException("L'Email existe déjà", status_code=status.HTTP_409_CONFLICT)
    db.refresh(db_user)
    return db_user


class UserLogin(BaseModel):
    """User Login Model"""
    email: str
    password: str

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "email": "test@test.com",
                "password": "Test1234",
            }
        }


class UserLoginException(Exception):
    """User Exception"""

    def __init__(self, message: str, status_code: int = status.HTTP_400_BAD_REQUEST):
        self.message = message
        self.code = status_code

    def __str__(self):
        return self.message

    @staticmethod
    def responses():
        return {
            status.HTTP_400_BAD_REQUEST: {"description": "Bad Request", **DefaultErrorResponse()},
        }


def login_user(db: Session, user: UserLogin) -> User:
    """
    Login user
    :param db: Session of database
    :param user: User to login
    :return: Logged user
    """
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user is None or not verify_password(user.password, db_user.password):
        raise UserLoginException("Incorrect email address ou mot de passe", status_code=status.HTTP_400_BAD_REQUEST)
    return db_user


class UserMe(BaseModel):
    id: int
    email: str
    surname: str
    name: str

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": 1,
                "email": "test@test.com",
                "surname": "Test",
                "name": "Test"
            }
        }


def get_user_by_id(db: Session, user_id: int) -> UserMe:
    """
    Get user
    :param db: Session of database
    :param user_id: User id
    :return: User
    """
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user is None:
        raise User.NotFoundException("User n'est pas trouvé")
    return UserMe(email=db_user.email, surname=db_user.surname, name=db_user.name, id=db_user.id)
