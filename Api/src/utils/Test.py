import sys


def inTestMode():
    return "unittest" in sys.modules.keys()