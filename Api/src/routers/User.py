"""
User router
"""

from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session

from src.middleware.User import MiddlewareUser
from src.utils.Database import get_db
from src.models.User import create_user, UserCreate, UserCreateException, UserToken, UserLoginException, UserLogin, \
    login_user, UserMe
from src.utils.Jwt import create_jwt_from_user, JWTException

from src.utils.Helper import warn, DefaultErrorResponse

UsersRouter = APIRouter(
    prefix="/user",
    tags=["User"],
)


@UsersRouter.post("/signup",
                  summary="Create user",
                  description="Create user",
                  response_description="User created",
                  response_model=UserToken,
                  status_code=status.HTTP_201_CREATED,
                  responses={**UserCreateException.responses(),
                             status.HTTP_401_UNAUTHORIZED: {"description": "Issue when creating authorization token",
                                                            **DefaultErrorResponse()}})
async def createUser(UserCreate: UserCreate, db: Session = Depends(get_db), response: Response = Response()):
    """
    Create user
    :param UserCreate: User Data
    :param db: Session of database
    :param response: Response
    :return: Jwt token in the header to fast connection
    """
    try:
        createUser = create_user(db, UserCreate)
    except UserCreateException as e:
        raise HTTPException(status_code=e.code, detail=e.message)
    try:
        jwt = create_jwt_from_user(createUser)
    except JWTException as e:
        warn(str(e))
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Issue when creating authorization token")
    response.headers["Authorization"] = jwt
    return UserToken(access_token=jwt)


@UsersRouter.post("/login",
                  summary="Login user",
                  description="Login user",
                  response_description="User logged",
                  response_model=UserToken,
                  status_code=status.HTTP_200_OK,
                  responses=UserLoginException.responses())
async def loginUser(UserLogin: UserLogin, db: Session = Depends(get_db), response: Response = Response()):
    """
    Login user
    :param UserLogin: User Data
    :param db: Session of database
    :param response: Response
    :return: Jwt token in the header to fast connection
    """
    try:
        loginUser = login_user(db, UserLogin)
    except UserLoginException as e:
        raise HTTPException(status_code=e.code, detail=e.message)
    try:
        jwt = create_jwt_from_user(loginUser)
    except JWTException as e:
        warn(str(e))
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Erreur lors de la création du token")
    response.headers["Authorization"] = jwt
    return UserToken(access_token=jwt)


@UsersRouter.get("/me",
                 summary="Get user",
                 description="Get user",
                 response_description="User",
                 response_model=UserMe,
                 status_code=status.HTTP_200_OK,
                 dependencies=[Depends(MiddlewareUser.check)],
                 responses=MiddlewareUser.responses())
async def getUser(User: UserMe = Depends(MiddlewareUser.check)):
    """
    Get User
    :param User: User created by middleware
    :return: User
    """
    return User
