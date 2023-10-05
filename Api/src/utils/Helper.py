import warnings
import sys


def inTestMode():
    """
    Check if in test mode
    :return: True if in test mode
    """
    return "unittest" in sys.modules.keys()


def warn(message: str):
    """
    Warn message if not in test mode
    :param message: Message
    :return: None
    """
    if not inTestMode():  # pragma: no cover
        warnings.warn(message)


def DefaultErrorResponse() -> dict:
    """
    Default error response
    :return: Error response
    """
    return {"content": {"application/json": {"example": {"detail": "string"}}}}
