from datetime import datetime, timedelta

from src.constants import Environment
from src.models.User import User
from jose import jwt


def create_jwt(data: dict, expires_delta: timedelta | None = None,
               Env: Environment.Settings = Environment.Settings()) -> str:
    """
    Create jwt token
    :param Env: Environment
    :param data: simple dict to encode as JWT
    :param expires_delta: timedelta for expire
    :return: basic jwt token
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=Env.JWT_EXPIRE_DAYS, seconds=Env.JWT_EXPIRE_SECONDS)
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, Env.JWT_SECRET, algorithm=Env.JWT_ALGORITHM)


def create_jwt_from_user(User: User) -> str:
    """
    Create jwt token from user
    :param User: User
    :return: basic jwt token
    """
    User_to_encode = User._asdict()
    User_to_encode.pop("hashed_password")
    User_to_encode.pop("id")
    return create_jwt(User_to_encode)
