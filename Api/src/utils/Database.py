import sys

from sqlalchemy import create_engine, inspect
from sqlalchemy.ext.declarative import declarative_base, as_declarative
from sqlalchemy.orm import sessionmaker
from src.constants import Environment
from src.utils.Helper import inTestMode

env = Environment.Settings()

if inTestMode():
    engine = create_engine(
        env.SQL_TEST_URL,
        connect_args={"check_same_thread": False}
    )
else: # pragma: no cover
    engine = create_engine(
        env.SQL_URL,
        connect_args={"check_same_thread": False}
    )
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db() -> SessionLocal:
    """
    Get database session
    :return: Database session
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@as_declarative()
class Base:
    """Base Model"""

    def _asdict(self):
        return {c.key: getattr(self, c.key)
                for c in inspect(self).mapper.column_attrs}
