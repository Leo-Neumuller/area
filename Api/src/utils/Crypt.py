from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify password
    :param plain_password: Base password
    :param hashed_password: Hashed password
    :return: True if password is correct, False otherwise
    """
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """
    Get password hash
    :param password: password
    :return: hashed password
    """
    return pwd_context.hash(password)
