from src.utils.Jwt import *
import unittest

class TestJwt(unittest.TestCase):

    def test_create_jwt(self):
        jwt = create_jwt({"test": "test"})
        self.assertTrue(isinstance(jwt, str))
        self.assertTrue(decode_jwt(jwt)["test"] == "test")

    def test_create_jwt_with_expires_delta(self):
        jwt = create_jwt({"test": "test"}, timedelta(seconds=1))
        self.assertTrue(isinstance(jwt, str))
        self.assertTrue(decode_jwt(jwt)["test"] == "test")

    def test_create_jwt_with_expires_delta_and_wrong_algorithm(self):
        with self.assertRaises(JWTException) as e:
            create_jwt({"test": "test"}, timedelta(seconds=1), Environment.Settings(JWT_ALGORITHM="wrong"))

    def test_create_jwt_from_user(self):
        user = User(id=1, email="test@test.com", password="Test1234", surname="Test", name="Test")
        jwt = create_jwt_from_user(user)
        decoded = decode_jwt(jwt)
        self.assertTrue(isinstance(jwt, str))
        self.assertTrue(decoded["id"] == user.id)
        self.assertTrue(decoded["email"] == user.email)
        self.assertTrue(decoded["surname"] == user.surname)
        self.assertTrue(decoded["name"] == user.name)
        self.assertTrue("password" not in decode_jwt(jwt))

    def test_decode_with_wrong_algorithm(self):
        user = User(id=1, email="test@test.com", password="Test1234", surname="Test", name="Test")
        jwt = create_jwt_from_user(user)
        with self.assertRaises(JWTException) as e:
            decode_jwt(jwt, Environment.Settings(JWT_ALGORITHM="wrong"))

    def test_decode_expired_jwt(self):
        jwt = create_jwt({"test": "test"}, timedelta(seconds=-1))
        with self.assertRaises(JWTExpiredException) as e:
            decode_jwt(jwt)

    def test_exception(self):
        with self.assertRaises(JWTException) as e:
            raise JWTException("test")
        self.assertTrue(str(e.exception) == "test")

    def test_expired_exception(self):
        with self.assertRaises(JWTExpiredException) as e:
            raise JWTExpiredException("test")
        self.assertTrue(str(e.exception) == "test")
        





