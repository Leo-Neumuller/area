import asyncio
import functools

from sqlalchemy.orm import Session

from src.models.Services import Service
from src.models.User import UserCreate, User, create_user
from src.utils import Database
from src.utils.Database import get_db
import main


def test_help_create_user(db: Session) -> User:
    """Create a user in the database."""
    userCreate = UserCreate(email="test@test.com", password="Test1234", surname="Test", name="Test")
    user = create_user(db, userCreate)
    return user


def test_help_create_fake_service(service: str, db: Session, user: User) -> None:
    """Create a fake service in the database."""
    service = Service(
        name=service,
        state="Test",
        user_id=user.id,
        refresh={'token': "credentials.token",
                 'refresh_token': "credentials.refresh_token",
                 'token_uri': "credentials.token_uri",
                 'client_id': "credentials.client_id",
                 'client_secret': "credentials.client_secret",
                 'scopes': "credentials.scopes"}
    )
    db.add(service)
    db.commit()


def test_help_remove_user(db: Session, user: User):
    """Remove a user from the database."""
    db.query(User).filter(User.id == user.id).delete()


def test_help_create_db() -> Session:
    """Create a database for testing."""
    Database.Base.metadata.create_all(bind=Database.engine)
    return next(get_db())


def test_help_close_db(db: Session) -> None:
    """Close a database."""
    db.close()
    Database.Base.metadata.drop_all(bind=Database.engine)


def async_test(func):
    """Decorator to turn an async function into a test case."""

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        coro = func(*args, **kwargs)
        asyncio.run(coro)

    return wrapper
