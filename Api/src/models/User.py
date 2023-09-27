import sqlalchemy
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import Session
from fastapi import status

from src.utils.Database import Base
from src.utils.Crypt import get_password_hash
from src.utils.RegexChecker import check_email, check_password


class User(Base):
    """User Model"""
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    surname = Column(String)
    name = Column(String)

    def __repr__(self):
        return f"<User(id={self.id}, email={self.email}, surname={self.surname}, name={self.name})>"


class UserCreate(BaseModel):
    """User Create Model"""
    email: str
    password: str
    surname: str
    name: str

    class Config:
        orm_mode = True
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


class UserException(Exception):
    """User Exception"""

    def __init__(self, message: str, status_code: int = status.HTTP_400_BAD_REQUEST):
        self.message = message
        self.code = status_code

    def __str__(self):
        return self.message


def create_user(db: Session, user: UserCreate) -> User:
    """
    Create user
    :param db: Session of database
    :param user: User to create
    :return: Created user
    """
    if check_email(user.email) is False:
        raise UserException("Email is not valid", status_code=status.HTTP_400_BAD_REQUEST)
    if check_password(user.password) is False:
        raise UserException(
            "Password is not valid, Should have eight characters, at least one uppercase letter, one lowercase letter and one number",
            status_code=status.HTTP_400_BAD_REQUEST)
    if len(user.surname) == 0:
        raise UserException("Surname is empty", status_code=status.HTTP_400_BAD_REQUEST)
    if len(user.name) == 0:
        raise UserException("Name is empty", status_code=status.HTTP_400_BAD_REQUEST)
    hashed_password = get_password_hash(user.password)
    db_user = User(email=user.email, hashed_password=hashed_password, surname=user.surname, name=user.name)
    db.add(db_user)
    try:
        db.commit()
    except sqlalchemy.exc.IntegrityError:
        db.rollback()
        raise UserException("Email already exists", status_code=status.HTTP_409_CONFLICT)
    db.refresh(db_user)
    return db_user
