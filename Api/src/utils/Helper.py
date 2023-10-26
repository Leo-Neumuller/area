import os
import traceback
import warnings
import sys
from inspect import getframeinfo, stack


def inTestMode():
    """
    Check if in test mode
    :return: True if in test mode
    """
    return "unittest" in sys.modules.keys()


def inDocMode():
    """
    Check if in doc mode
    :return: True if in doc mode
    """
    return "sphinx" in sys.modules.keys()


def warn(message: str):
    """
    Warn message if not in test mode
    :param message: Message
    :return: None
    """
    if not inTestMode():  # pragma: no cover*
        if os.environ["DEBUG"] == "True":
            print(f"\x1b[31;20m" + f"ERROR:\x1b[0m {traceback.format_exc()}", end="")
        for call in range(min(len(stack()), 3), 0, -1):
            caller = getframeinfo(stack()[call][0])
            if call == 1:
                print(f"\x1b[33;20m" + f"WARNING:\x1b[0m ({caller.filename}:{caller.lineno}) {message}")
            else:
                print(f"\x1b[33;20m" + f"WARNING:\x1b[0m ({caller.filename}:{caller.lineno})")


def info(message: str):
    if not inTestMode() and os.environ["DEBUG"] == "True":  # pragma: no cover
        caller = stack()[1][3]
        print(f"\x1b[32;20m" + f"INFO: ({caller}) {message}" + "\x1b[0m")


def DefaultErrorResponse() -> dict:
    """
    Default error response
    :return: Error response
    """
    return {"content": {"application/json": {"example": {"detail": "string"}}}}
