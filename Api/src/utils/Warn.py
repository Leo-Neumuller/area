import warnings

from src.utils.Test import inTestMode


def warn(message: str):
    """
    Warn message if not in test mode
    :param message: Message
    :return: None
    """
    if not inTestMode():  # pragma: no cover
        warn(message)
