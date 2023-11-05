"""
User Authentication Middleware
"""

from fastapi import HTTPException, Header, status, Depends
from sqlalchemy.orm import Session

from src.models.User import get_user_by_id, User, UserMe
from src.utils.Database import get_db
from src.utils.Jwt import decode_jwt, JWTException, JWTExpiredException
from src.utils.Helper import warn, DefaultErrorResponse


class MiddlewareUser:
    @staticmethod
    async def check(access_token: str = Header(None), db: Session = Depends(get_db)) -> UserMe:
        """
        Check if user is logged
        :param access_token: Authorization header
        :param db: Session of database
        :return: User
        """
        if access_token is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
        try:
            decoded_user = decode_jwt(access_token)
        except JWTExpiredException as e:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
        except JWTException as e:
            warn(str(e))
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
        if "id" not in decoded_user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
        try:
            get_user = get_user_by_id(db, decoded_user["id"])
        except User.NotFoundException as e:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
        return get_user
    @staticmethod
    def responses():
        return {
            status.HTTP_401_UNAUTHORIZED: {"description": "Unauthorized", **DefaultErrorResponse()},
        }
