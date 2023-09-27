from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from src.utils.Database import get_db
from src.models.User import create_user, UserCreate, UserException, UserToken
from src.utils.Jwt import create_jwt_from_user

UsersRouter = APIRouter(
    prefix="/user",
    tags=["User"],
)


@UsersRouter.post("/",
                  summary="Create user",
                  description="Create user",
                  response_description="User created",
                  response_model=UserToken,
                  status_code=status.HTTP_201_CREATED)
async def createUser(UserCreate: UserCreate, db: Session = Depends(get_db)):
    """
    Create user
    :param UserCreate: User Data
    :param db: Session of database
    :return: Jwt token in the header to fast connection
    """
    try:
        createUser = create_user(db, UserCreate)
    except UserException as e:
        raise HTTPException(status_code=e.code, detail=e.message)
    jwt = create_jwt_from_user(createUser)
    return UserToken(token=jwt)
