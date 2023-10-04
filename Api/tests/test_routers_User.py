import unittest

from src.models.User import User
from src.routers.User import *
from src.utils import Database
from src.utils.Jwt import decode_jwt
from tests.helper import test_help_create_db, async_test, test_help_remove_user, test_help_create_user


class TestRoutersUser(unittest.TestCase):
    def setUp(self):
        self.db = test_help_create_db()

    @async_test
    async def test_create_user(self):
        user = UserCreate(email="test@test.com", password="Test1234", surname="Test", name="Test")
        response = (await createUser(user, self.db)).model_dump()
        self.assertTrue(isinstance(response, dict))
        self.assertTrue("access_token" in response)
        jwt = decode_jwt(response["access_token"])
        self.assertTrue(isinstance(jwt, dict))
        self.assertTrue(jwt["email"] == user.email)
        self.assertTrue(jwt["surname"] == user.surname)
        self.assertTrue(jwt["name"] == user.name)
        test_help_remove_user(self.db, User(id=jwt["id"], email=jwt["email"], password="", surname=jwt["surname"], name=jwt["name"]))

    @async_test
    async def test_create_user_invalid_email(self):
        user = UserCreate(email="test@test", password="Test1234", surname="Test", name="Test")
        with self.assertRaises(HTTPException):
            await createUser(user, self.db)

    @async_test
    async def test_login_user(self):
        user = test_help_create_user(self.db)
        userLogin = UserLogin(email="test@test.com", password="Test1234")
        response = (await loginUser(userLogin, self.db)).model_dump()
        self.assertTrue(isinstance(response, dict))
        self.assertTrue("access_token" in response)
        jwt = decode_jwt(response["access_token"])
        self.assertTrue(isinstance(jwt, dict))
        self.assertTrue(jwt["email"] == user.email)
        self.assertTrue(jwt["surname"] == user.surname)
        self.assertTrue(jwt["name"] == user.name)
        test_help_remove_user(self.db, User(id=jwt["id"], email=jwt["email"], password="", surname=jwt["surname"],
                                            name=jwt["name"]))

    @async_test
    async def test_login_user_invalid_email(self):
        user = UserCreate(email="test@test", password="Test1234", surname="Test", name="Test")
        with self.assertRaises(HTTPException):
            await loginUser(user, self.db)

    @async_test
    async def test_get_user(self):
        user = test_help_create_user(self.db)
        jwt = create_jwt_from_user(user)
        response = (await getUser(await MiddlewareUser.check(jwt, self.db))).model_dump()
        self.assertTrue(isinstance(response, dict))
        self.assertTrue("id" in response)
        self.assertTrue("email" in response)
        self.assertTrue("surname" in response)
        self.assertTrue("name" in response)
        self.assertEqual(response["id"], user.id)
        self.assertEqual(response["email"], user.email)
        self.assertEqual(response["surname"], user.surname)
        self.assertEqual(response["name"], user.name)
        test_help_remove_user(self.db, user)

    def tearDown(self) -> None:
        self.db.close()
        Database.Base.metadata.drop_all(bind=Database.engine)
