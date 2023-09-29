import warnings

from src.utils.Test import inTestMode


def warn(message: str):
    if not inTestMode(): # pragma: no cover
        warn(message)
