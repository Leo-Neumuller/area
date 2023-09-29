import sys


def inTestMode():
    """
    Check if in test mode
    :return: True if in test mode
    """
    return "unittest" in sys.modules.keys()