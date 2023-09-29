import unittest
from datetime import timedelta

from src.middleware.User import *
from src.utils import Database
from src.utils.Jwt import create_jwt_from_user, create_jwt
from tests.helper import test_help_create_user, test_help_remove_user, async_test, test_help_create_db


class TestMiddlewareUser(unittest.TestCase):
    def setUp(self):
        self.db = test_help_create_db()

    @async_test
    async def test_middleware_user_check(self):
        user = test_help_create_user(self.db)
        jwt = create_jwt_from_user(user)
        userme = await MiddlewareUser.check(jwt, self.db)
        self.assertTrue(isinstance(userme, UserMe))
        self.assertEqual(user.id, user.id)
        self.assertEqual(user.email, user.email)
        self.assertEqual(user.surname, user.surname)
        self.assertEqual(user.name, user.name)
        test_help_remove_user(self.db, user)

    @async_test
    async def test_middleware_user_check_none_jwt(self):
        with self.assertRaises(HTTPException):
            await MiddlewareUser.check(None, self.db)

    @async_test
    async def test_middleware_user_check_invalid_jwt(self):
        with self.assertRaises(HTTPException):
            await MiddlewareUser.check("invalid", self.db)

    @async_test
    async def test_middleware_user_check_invalid_jwt_expired(self):
        with self.assertRaises(HTTPException):
            await MiddlewareUser.check(create_jwt({"test": "test"}, timedelta(seconds=-10)), self.db)

    @async_test
    async def test_middleware_user_check_invalid_jwt_without_id(self):
        with self.assertRaises(HTTPException):
            await MiddlewareUser.check(create_jwt({"test": "test"}), self.db)

    @async_test
    async def test_middleware_user_check_invalid_jwt_with_wrong_id(self):
        with self.assertRaises(HTTPException):
            await MiddlewareUser.check(create_jwt({"id": 999}), self.db)

    def test_middleware_user_responses(self):
        self.assertTrue(isinstance(MiddlewareUser.responses(), dict))

    def tearDown(self) -> None:
        self.db.close()
        Database.Base.metadata.drop_all(bind=Database.engine)
