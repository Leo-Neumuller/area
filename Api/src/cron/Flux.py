import time

from fastapi import Depends

from src.models.User import User
from src.utils.Database import get_db


def execute_flux(db=next(get_db())):
    print("Executing flux...")

