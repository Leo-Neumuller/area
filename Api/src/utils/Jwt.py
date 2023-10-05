import warnings
from datetime import datetime, timedelta

from jose.exceptions import JWTClaimsError, JWSError

from src.constants import Environment
from src.models.User import User
from jose import jwt, JWTError, ExpiredSignatureError

from src.utils.Helper import warn


class JWTException(Exception):
    def __init__(self, message: str):
        self.message = message

    def __str__(self):
        return self.message


class JWTExpiredException(JWTException):
    def __init__(self, message: str):
        super().__init__(message)

    def __str__(self):
        return self.message


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
    try:
        return jwt.encode(to_encode, Env.JWT_SECRET, algorithm=Env.JWT_ALGORITHM)
    except (JWTError, JWSError) as e:
        warn(str(e))
        raise JWTException(str(e))


def create_jwt_from_user(User: User) -> str:
    """
    Create jwt token from user
    :param User: User
    :return: basic jwt token
    """
    User_to_encode = User._asdict()
    User_to_encode.pop("password")
    return create_jwt(User_to_encode)


def decode_jwt(token: str, Env: Environment.Settings = Environment.Settings()) -> dict:
    """
    Decode jwt token
    :param Env: Environment
    :param token: jwt token
    :return: decoded jwt token
    """
    try:
        return jwt.decode(token, Env.JWT_SECRET, algorithms=[Env.JWT_ALGORITHM])
    except ExpiredSignatureError as e:
        raise JWTExpiredException(str(e))
    except (JWTError, JWTClaimsError, JWSError) as e:
        raise JWTException(str(e))
