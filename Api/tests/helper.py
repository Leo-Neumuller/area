import asyncio
import functools

from sqlalchemy.orm import Session

from src.models.User import UserCreate, User, create_user
from src.utils import Database
from src.utils.Database import get_db


def test_help_create_user(db: Session) -> User:
    userCreate = UserCreate(email="test@test.com", password="Test1234", surname="Test", name="Test")
    user = create_user(db, userCreate)
    return user


def test_help_remove_user(db: Session, user: User):
    db.query(User).filter(User.id == user.id).delete()


def test_help_create_db() -> Session:
    Database.Base.metadata.create_all(bind=Database.engine)
    return next(get_db())


def async_test(func):
    """Decorator to turn an async function into a test case."""

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        coro = func(*args, **kwargs)
        asyncio.run(coro)

    return wrapper
