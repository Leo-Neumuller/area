import unittest

from src.models.User import *
from src.utils import Database
from src.utils.Database import get_db
from tests.helper import test_help_create_user, test_help_remove_user, test_help_create_db


class TestModelsUser(unittest.TestCase):
    def setUp(self):
        self.db = test_help_create_db()

    def test_create_user(self):
        userCreate = UserCreate(email="test@test.com", password="Test1234", surname="Test", name="Test")
        user = create_user(self.db, userCreate)
        self.assertTrue(isinstance(user, User))
        self.assertEqual(user.email, userCreate.email)
        self.assertTrue(verify_password(userCreate.password, user.password))
        self.assertFalse(userCreate.password == user.password)
        self.assertEqual(user.surname, userCreate.surname)
        self.assertEqual(user.name, userCreate.name)
        test_help_remove_user(self.db, user)

    def test_create_user_email_already_exists(self):
        userCreate = UserCreate(email="test@test.com", password="Test1234", surname="Test", name="Test")
        user = create_user(self.db, userCreate)
        with self.assertRaises(UserCreateException):
            create_user(self.db, userCreate)
        test_help_remove_user(self.db, user)

    def test_create_user_invalid_email(self):
        userCreate = UserCreate(email="test@test", password="Test1234", surname="Test", name="Test")
        with self.assertRaises(UserCreateException):
            create_user(self.db, userCreate)

    def test_create_user_invalid_password(self):
        userCreate = UserCreate(email="test@test.com", password="Test", surname="Test", name="Test")
        with self.assertRaises(UserCreateException):
            create_user(self.db, userCreate)

    def test_create_user_invalid_surname(self):
        userCreate = UserCreate(email="test@test.com", password="Test1234", surname="", name="Test")
        with self.assertRaises(UserCreateException):
            create_user(self.db, userCreate)

    def test_create_user_invalid_name(self):
        userCreate = UserCreate(email="test@test.com", password="Test1234", surname="Test", name="")
        with self.assertRaises(UserCreateException):
            create_user(self.db, userCreate)

    def test_login_user(self):
        user = test_help_create_user(self.db)
        userLogin = UserLogin(email="test@test.com", password="Test1234", surname="Test", name="Test")
        loginUser = login_user(self.db, userLogin)
        self.assertTrue(isinstance(loginUser, User))
        self.assertEqual(loginUser.id, user.id)
        self.assertEqual(loginUser.email, user.email)
        self.assertEqual(loginUser.surname, user.surname)
        self.assertEqual(loginUser.name, user.name)
        test_help_remove_user(self.db, user)

    def test_login_user_invalid_email(self):
        user = test_help_create_user(self.db)
        userLogin = UserLogin(email="test@test", password="Test1234", surname="Test", name="Test")
        with self.assertRaises(UserLoginException):
            login_user(self.db, userLogin)
        test_help_remove_user(self.db, user)

    def test_login_user_invalid_password(self):
        user = test_help_create_user(self.db)
        userLogin = UserLogin(email="test@test.com", password="Test", surname="Test", name="Test")
        with self.assertRaises(UserLoginException):
            login_user(self.db, userLogin)
        test_help_remove_user(self.db, user)

    def test_get_by_id(self):
        user = test_help_create_user(self.db)
        userGet = get_user_by_id(self.db, user.id)
        self.assertTrue(isinstance(userGet, UserMe))
        self.assertEqual(userGet.id, user.id)
        self.assertEqual(userGet.email, user.email)
        self.assertEqual(userGet.surname, user.surname)
        self.assertEqual(userGet.name, user.name)
        test_help_remove_user(self.db, user)

    def test_get_by_id_invalid_id(self):
        with self.assertRaises(User.NotFoundException):
            get_user_by_id(self.db, 0)

    def test_UserLoginException(self):
        with self.assertRaises(UserLoginException) as e:
            raise UserLoginException("test")
        self.assertTrue(str(e.exception) == "test")
        self.assertTrue(e.exception.code == status.HTTP_400_BAD_REQUEST)
        self.assertTrue(isinstance(UserLoginException.responses(), dict))

    def test_UserCreateException(self):
        with self.assertRaises(UserCreateException) as e:
            raise UserCreateException("test")
        self.assertTrue(str(e.exception) == "test")
        self.assertTrue(e.exception.code == status.HTTP_400_BAD_REQUEST)
        self.assertTrue(isinstance(UserCreateException.responses(), dict))

    def test_UserException(self):
        with self.assertRaises(User.Exception) as e:
            raise User.Exception("test")
        self.assertTrue(str(e.exception) == "test")

    def test_UserNotFoundException(self):
        with self.assertRaises(User.NotFoundException) as e:
            raise User.NotFoundException("test")
        self.assertTrue(str(e.exception) == "test")

    def tearDown(self) -> None:
        self.db.close()
        Database.Base.metadata.drop_all(bind=Database.engine)
