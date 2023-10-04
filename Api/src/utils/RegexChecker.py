import re


def check_email(email: str) -> bool:
    """
    Check if email is valid
    :param email: email to check
    :return: True if email is valid, False otherwise
    """
    regex = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    return re.match(regex, email) is not None


def check_password(password: str) -> bool:
    """
    Check if password is valid
    :param password: password to check
    :return: True if password is valid, False otherwise
    """
    regex = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
    return re.match(regex, password) is not None
