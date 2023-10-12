import unittest
from src.services.Gmail import *
from tests.helper import test_help_close_db, test_help_create_db, test_help_create_user, test_help_create_fake_service


class TestServicesGmail(unittest.TestCase):
    def setUp(self):
        self.db = test_help_create_db()
        self.user = UserMe(**(test_help_create_user(self.db)._asdict()))
        self.service_name = "Gmail"
        self.version = "v1"
        self.Gmail = Gmail(self.user, self.db)

    def test_get_description(self):
        self.assertTrue(isinstance(Gmail().get_interface(), dict))

    def test_get_authorization_url(self):
        authorisation = Gmail.get_authorization_url(self.user, self.db)
        self.assertTrue(isinstance(authorisation, str))

    def test_authorize(self):
        with self.assertRaises(Service.Exception.InvalidGrant):
            Gmail.authorize("Test", "Test", ["https://mail.google.com/"], self.db)

    def test_create_email(self):
        data = {
            "content": "Test",
            "subject": "Test",
            "to": "Test"
        }
        encoded_email = Gmail.create_email(data, None)
        self.assertTrue(isinstance(encoded_email, str))

    def tearDown(self) -> None:
        test_help_close_db(self.db)
