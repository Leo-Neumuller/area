import unittest
from unittest.mock import patch, MagicMock

from google.oauth2.credentials import Credentials

from src.utils.Services import *
from tests.helper import test_help_create_db, test_help_create_user, test_help_close_db, test_help_create_fake_service


class TestUtilsServices(unittest.TestCase):
    def setUp(self):
        self.db = test_help_create_db()

    def test_get_authorization_url(self):
        with patch.object(google_auth_oauthlib.flow.Flow, "from_client_secrets_file") as mock:
            mock.return_value = MagicMock()
            mock.return_value.redirect_uri = None
            mock.return_value.authorization_url.return_value = ("TestUrl", "TestState")
            url, state = Google.get_authorization_url("Gmail", ["https://mail.google.com/"])
            self.assertEqual(url, "TestUrl")
            self.assertEqual(state, "TestState")

    def test_get_services_with_no_service_saved(self):
        user = test_help_create_user(self.db)
        with self.assertRaises(Service.Exception.InvalidService):
            Google.get_service("Gmail", UserMe(**(user._asdict())), self.db, "v1")

    def test_get_services_with_service_saved_but_not_refresh(self):
        user = test_help_create_user(self.db)
        service = Service(
            name="Gmail",
            state="Test",
            user_id=user.id,
            refresh=None
        )
        self.db.add(service)
        self.db.commit()
        with self.assertRaises(Service.Exception.InvalidService):
            Google.get_service("Gmail", UserMe(**(user._asdict())), self.db, "v1")

    def test_get_services_with_service_saved(self):
        user = test_help_create_user(self.db)
        test_help_create_fake_service("Gmail", self.db, user)
        service = Google.get_service("Gmail", UserMe(**(user._asdict())), self.db, "v1")
        self.assertTrue(isinstance(service, googleapiclient.discovery.Resource))

    def test_authorize_with_invalid_grant(self):
        with self.assertRaises(Service.Exception.InvalidGrant):
            with patch.object(google_auth_oauthlib.flow.Flow, "from_client_secrets_file") as mock:
                mock.return_value = MagicMock()
                mock.return_value.redirect_uri = None
                mock.return_value.fetch_token.side_effect = Exception("Invalid Grant")
                Google.authorize("Gmail", "Test", "Test", ["https://mail.google.com/"])

    def test_authorize(self):
        with patch.object(google_auth_oauthlib.flow.Flow, "from_client_secrets_file") as mock:
            mock.return_value = MagicMock()
            mock.return_value.redirect_uri = None
            mock.return_value.fetch_token.return_value = None
            mock.credentials = Credentials(
                token="Test",
                refresh_token="Test",
                token_uri="Test",
                client_id="Test",
                client_secret="Test",
                scopes=["Test"]
            )
            Google.authorize("Gmail", "Test", "Test", ["https://mail.google.com/"])

    def test_get_headers_from_message_with_no_headers(self):
        filled = Google.get_headers_from_message({}, {"Test": None})
        self.assertTrue("Test" in filled)
        self.assertEqual(filled["Test"], None)

    def test_get_headers_from_message(self):
        filled = Google.get_headers_from_message(
            {"headers": [{"name": "Test", "value": "Test"}, {"name": "dre", "value": "dre"}]},
            {"Test": None, "dre": None})
        self.assertTrue("Test" in filled)
        self.assertEqual(filled["Test"], "Test")

    def tearDown(self) -> None:
        test_help_close_db(self.db)