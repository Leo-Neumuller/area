import datetime
import unittest
from unittest.mock import patch, MagicMock

import google_auth_oauthlib
import email.utils

from src.services.Gmail import *
from tests.helper import test_help_close_db, test_help_create_db, test_help_create_user


class TestServicesGmail(unittest.TestCase):
    def setUp(self):
        self.db = test_help_create_db()
        self.user = UserMe(**(test_help_create_user(self.db)._asdict()))
        self.service_name = "Gmail"
        self.version = "v1"
        self.Gmail = Gmail(self.user, self.db)

    def test_get_description(self):
        data = Gmail().get_interface()
        self.assertTrue(isinstance(data, dict))
        time = data[ServiceType.action]["Gmail_action_new_email_from_email"].prev_data["time"]()
        self.assertTrue(isinstance(time, float))
        time = data[ServiceType.action]["Gmail_action_new_email_with_subject"].prev_data["time"]()
        self.assertTrue(isinstance(time, float))
    def test_get_authorization_url(self):
        with patch.object(Google, "get_authorization_url") as mock:
            mock.return_value = ("TestUrl", "TestState")
            url = Gmail.get_authorization_url(self.user, self.db, "http://locahost:8080")
            mock.assert_called_once_with("Gmail", ['https://mail.google.com/'], "http://locahost:8080")
            self.assertEqual(url, "TestUrl")
            data = self.db.query(Service).filter(Service.name == "Gmail", Service.state == "TestState").first()
            self.assertEqual(data.name, "Gmail")
            self.assertEqual(data.state, "TestState")
            self.assertEqual(data.user_id, self.user.id)

    def test_authorize_invalid_grant(self):
        with self.assertRaises(Service.Exception.InvalidGrant):
            with patch.object(google_auth_oauthlib.flow.Flow, "from_client_secrets_file") as mock:
                mock.return_value = MagicMock()
                mock.return_value.redirect_uri = None
                mock.return_value.fetch_token.side_effect = Exception("Invalid Grant")
                Gmail.authorize("Test", "Test", ["https://mail.google.com/"], self.db, "http://locahost:8080")

    def test_authorize(self):
        with patch.object(Google, "authorize") as mock:
            mock.return_value = {"token": "test"}
            Gmail.authorize("Test", "Test", ["https://mail.google.com/"], self.db, "http://locahost:8080")
            mock.assert_called_once_with(service="Gmail", state="Test", code="Test",
                                         scopes=["https://mail.google.com/"], redirect='http://locahost:8080')

    def test_create_draft(self):
        with patch.object(Google, "get_service") as mock:
            mock.return_value = MagicMock()
            mock.return_value.users.return_value = MagicMock()
            mock.return_value.users.return_value.drafts.return_value = MagicMock()
            mock.return_value.users.return_value.getProfile.return_value = MagicMock()
            mock.return_value.users.return_value.getProfile.return_value.execute.return_value = {
                "emailAddress": "TestEmail"
            }
            mock.return_value.users.return_value.drafts.return_value.create.return_value = MagicMock()
            mock.return_value.users.return_value.drafts.return_value.create.return_value.execute.return_value = {
                "id": "TestId",
                "message": {
                    "id": "TestMessageId"
                }
            }
            data = self.Gmail.create_draft({
                "content": "ContentTest",
                "to": "ToTest",
                "subject": "SubjectTest"
            })
            mock.assert_called_once_with("gmail","Gmail", self.user, self.db, "v1")
            mock.return_value.users.return_value.getProfile.return_value.execute.assert_called_once()
            self.assertEqual(data, {"signal": True})

    def test_create_draft_with_error(self):
        with patch.object(Google, "get_service") as mock:
            mock.return_value = MagicMock()
            mock.return_value.users.return_value = MagicMock()
            mock.return_value.users.return_value.drafts.return_value = MagicMock()
            mock.return_value.users.return_value.getProfile.return_value = MagicMock()
            mock.return_value.users.return_value.getProfile.return_value.execute.return_value = {
                "emailAddress": "TestEmail"
            }
            mock.return_value.users.return_value.drafts.return_value.create.return_value = MagicMock()
            mock.return_value.users.return_value.drafts.return_value.create.return_value.execute.return_value = {
                "id": "TestId",
                "message": {
                    "id": "TestMessageId"
                }
            }
            mock.return_value.users.return_value.drafts.return_value.create.side_effect = Exception("Test")
            data = self.Gmail.create_draft({
                "content": "ContentTest",
                "to": "ToTest",
                "subject": "SubjectTest"
            })
            mock.assert_called_once_with("gmail", "Gmail", self.user, self.db, "v1")
            self.assertEqual(data, {"signal": False})

    def test_send_email(self):
        with patch.object(Google, "get_service") as mock:
            mock.return_value = MagicMock()
            mock.return_value.users.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value.send.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value.send.return_value.execute.return_value = {
                "id": "TestId",
                "threadId": "TestThreadId"
            }
            data = self.Gmail.send_email({
                "content": "ContentTest",
                "to": "ToTest",
                "subject": "SubjectTest"
            })
            mock.assert_called_once_with("gmail", "Gmail", self.user, self.db, "v1")
            self.assertEqual(data, {"signal": True})

    def test_send_email_with_error(self):
        with patch.object(Google, "get_service") as mock:
            mock.return_value = MagicMock()
            mock.return_value.users.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value.send.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value.send.side_effect = Exception("Test")
            data = self.Gmail.send_email({
                "content": "ContentTest",
                "to": "ToTest",
                "subject": "SubjectTest"
            })
            mock.assert_called_once_with("gmail", "Gmail", self.user, self.db, "v1")
            self.assertEqual(data, {"signal": False})

    def test_new_email_from_email(self):
        with patch.object(Google, "get_service") as mock:
            time = email.utils.format_datetime(datetime.now())
            mock.return_value = MagicMock()
            mock.return_value.users.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value.list.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value.list.return_value.execute.return_value = {
                "messages": [{
                    "id": "TestId",
                    "threadId": "TestThreadId"
                }],
                "resultSizeEstimate": 1
            }
            mock.return_value.users.return_value.messages.return_value.get.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value.get.return_value.execute.return_value = {
                "id": "TestId",
                "threadId": "TestThreadId",
                "payload": {
                    "headers": [
                        {
                            "name": "From",
                            "value": "TestEmail"
                        },
                        {
                            "name": "Date",
                            "value": time
                        },
                        {
                            "name": "Subject",
                            "value": "TestSubject"
                        },
                        {
                            "name": "To",
                            "value": "TestTo"
                        },
                    ],
                    "parts": [
                        {
                            "mimeType": "text/plain",
                            "body": {
                                "data": base64.urlsafe_b64encode("TestContent".encode()).decode()
                            }
                        }
                    ]
                }
            }
            data = self.Gmail.new_email_from_email({
                "time": 0,
            }, {
                "email": "TestEmail"
            })
            time_datetime = datetime.strptime(time, '%a, %d %b %Y %H:%M:%S %z')
            mock.assert_called_once_with("gmail", "Gmail", self.user, self.db, "v1")
            self.assertEqual(data, (
                {
                    "time": time_datetime.timestamp()
                }, {
                    "signal": True,
                    "data": [{
                        "From": "TestEmail",
                        "Date": time_datetime,
                        "Subject": "TestSubject",
                        "To": "TestTo",
                        "Content": "TestContent",
                    }]
                }))

    def test_new_email_from_email_with_no_email(self):
        with patch.object(Google, "get_service") as mock:
            time = email.utils.format_datetime(datetime.now())
            mock.return_value = MagicMock()
            mock.return_value.users.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value.list.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value.list.return_value.execute.return_value = {
                "messages": [{
                    "id": "TestId",
                    "threadId": "TestThreadId"
                }],
                "resultSizeEstimate": 0
            }
            data = self.Gmail.new_email_from_email({
                "time": 0,
            }, {
                "email": "TestEmail"
            })
            time_datetime = datetime.strptime(time, '%a, %d %b %Y %H:%M:%S %z')
            mock.assert_called_once_with("gmail", "Gmail", self.user, self.db, "v1")
            self.assertEqual(data, (
                {
                    "time": 0
                }, {
                    "signal": False,
                    "data": []
                })
                             )

    def test_new_email_from_email_with_error(self):
        with patch.object(Google, "get_service") as mock:
            mock.return_value = MagicMock()
            mock.return_value.users.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value.list.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value.list.return_value.execute.return_value = {
                "messages": [{
                    "id": "TestId",
                    "threadId": "TestThreadId"
                }],
                "resultSizeEstimate": 1
            }
            mock.return_value.users.return_value.messages.return_value.get.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value.get.side_effect = Exception("Test")
            data = self.Gmail.new_email_from_email({
                "time": 0,
            }, {
                "email": "TestEmail"
            })
            mock.assert_called_once_with("gmail", "Gmail", self.user, self.db, "v1")
            self.assertEqual(data, (
                {
                    "time": 0
                }, {
                    "signal": False,
                    "data": []
                }))

    def test_new_email_from_email_with_no_payload(self):
        with patch.object(Google, "get_service") as mock:
            time = email.utils.format_datetime(datetime.now())
            mock.return_value = MagicMock()
            mock.return_value.users.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value.list.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value.list.return_value.execute.return_value = {
                "messages": [{
                    "id": "TestId",
                    "threadId": "TestThreadId"
                }],
                "resultSizeEstimate": 1
            }
            mock.return_value.users.return_value.messages.return_value.get.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value.get.return_value.execute.return_value = {
                "id": "TestId",
                "threadId": "TestThreadId",
            }
            data = self.Gmail.new_email_from_email({
                "time": 0,
            }, {
                "email": "TestEmail"
            })
            time_datetime = datetime.strptime(time, '%a, %d %b %Y %H:%M:%S %z')
            mock.assert_called_once_with("gmail", "Gmail", self.user, self.db, "v1")
            self.assertEqual(data, (
                {
                    "time": 0
                }, {
                    "signal": False,
                    "data": []
                }))

    def test_new_email_from_email_with_no_parts(self):
        with patch.object(Google, "get_service") as mock:
            time = email.utils.format_datetime(datetime.now())
            mock.return_value = MagicMock()
            mock.return_value.users.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value.list.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value.list.return_value.execute.return_value = {
                "messages": [{
                    "id": "TestId",
                    "threadId": "TestThreadId"
                }],
                "resultSizeEstimate": 1
            }
            mock.return_value.users.return_value.messages.return_value.get.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value.get.return_value.execute.return_value = {
                "id": "TestId",
                "threadId": "TestThreadId",
                "payload": {
                    "headers": [
                        {
                            "name": "Date",
                            "value": time
                        }
                    ],
                }
            }
            data = self.Gmail.new_email_from_email({
                "time": 0,
            }, {
                "email": "TestEmail"
            })
            time_datetime = datetime.strptime(time, '%a, %d %b %Y %H:%M:%S %z')
            mock.assert_called_once_with("gmail", "Gmail", self.user, self.db, "v1")
            self.assertEqual(data, ({
                                        "time": time_datetime.timestamp()
                                    }, {
                                        "signal": True,
                                        "data": [{'Content': '',
                                                  'Date': time_datetime,
                                                  'From': '',
                                                  'Subject': '',
                                                  'To': ''}]
                                    }))

    def test_new_email_from_email_with_no_text_plain(self):
        with patch.object(Google, "get_service") as mock:
            time = email.utils.format_datetime(datetime.now())
            mock.return_value = MagicMock()
            mock.return_value.users.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value.list.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value.list.return_value.execute.return_value = {
                "messages": [{
                    "id": "TestId",
                    "threadId": "TestThreadId"
                }],
                "resultSizeEstimate": 1
            }
            mock.return_value.users.return_value.messages.return_value.get.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value.get.return_value.execute.return_value = {
                "id": "TestId",
                "threadId": "TestThreadId",
                "payload": {
                    "headers": [
                        {
                            "name": "Date",
                            "value": time
                        }
                    ],
                    "parts": [
                        {
                            "mimeType": "text/html",
                            "body": {
                                "data": base64.urlsafe_b64encode("TestContent".encode()).decode()
                            }
                        }
                    ]
                }
            }
            data = self.Gmail.new_email_from_email({
                "time": 0,
            }, {
                "email": "TestEmail"
            })
            time_datetime = datetime.strptime(time, '%a, %d %b %Y %H:%M:%S %z')
            mock.assert_called_once_with("gmail", "Gmail", self.user, self.db, "v1")
            self.assertEqual(data, ({
                                        "time": time_datetime.timestamp()
                                    }, {
                                        "signal": True,
                                        "data": [{'Content': '',
                                                  'Date': time_datetime,
                                                  'From': '',
                                                  'Subject': '',
                                                  'To': ''}]
                                    }))

    def test_new_email_with_subject(self):
        with patch.object(Google, "get_service") as mock:
            time = email.utils.format_datetime(datetime.now())
            mock.return_value = MagicMock()
            mock.return_value.users.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value.list.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value.list.return_value.execute.return_value = {
                "messages": [{
                    "id": "TestId",
                    "threadId": "TestThreadId"
                }],
                "resultSizeEstimate": 1
            }
            mock.return_value.users.return_value.messages.return_value.get.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value.get.return_value.execute.return_value = {
                "id": "TestId",
                "threadId": "TestThreadId",
                "payload": {
                    "headers": [
                        {
                            "name": "From",
                            "value": "TestEmail"
                        },
                        {
                            "name": "Date",
                            "value": time
                        },
                        {
                            "name": "Subject",
                            "value": "TestSubject"
                        },
                        {
                            "name": "To",
                            "value": "TestTo"
                        },
                    ],
                    "parts": [
                        {
                            "mimeType": "text/plain",
                            "body": {
                                "data": base64.urlsafe_b64encode("TestContent".encode()).decode()
                            }
                        }
                    ]
                }
            }
            data = self.Gmail.new_email_with_subject({
                "time": 0,
            }, {
                "subject": "TestSubject"
            })
            time_datetime = datetime.strptime(time, '%a, %d %b %Y %H:%M:%S %z')
            mock.assert_called_once_with("gmail", "Gmail", self.user, self.db, "v1")
            self.assertEqual(data, (
                {
                    "time": time_datetime.timestamp()
                }, {
                    "signal": True,
                    "data": [{
                        "From": "TestEmail",
                        "Date": time_datetime,
                        "Subject": "TestSubject",
                        "To": "TestTo",
                        "Content": "TestContent",
                    }]
                }))

    def test_new_email_with_subject_with_error(self):
        with patch.object(Google, "get_service") as mock:
            time = email.utils.format_datetime(datetime.now())
            mock.return_value = MagicMock()
            mock.return_value.users.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value.list.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value.list.return_value.execute.return_value = {
                "messages": [{
                    "id": "TestId",
                    "threadId": "TestThreadId"
                }],
                "resultSizeEstimate": 1
            }
            mock.return_value.users.return_value.messages.return_value.get.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value.get.side_effect = Exception("Test")
            data = self.Gmail.new_email_with_subject({
                "time": 0,
            }, {
                "subject": "TestSubject"
            })
            time_datetime = datetime.strptime(time, '%a, %d %b %Y %H:%M:%S %z')
            mock.assert_called_once_with("gmail", "Gmail", self.user, self.db, "v1")
            self.assertEqual(data, (
                {
                    "time": 0
                }, {
                    "signal": False,
                    "data": []
                }))

    def test_new_email_with_subject_with_no_subject(self):
        with patch.object(Google, "get_service") as mock:
            time = email.utils.format_datetime(datetime.now())
            mock.return_value = MagicMock()
            mock.return_value.users.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value.list.return_value = MagicMock()
            mock.return_value.users.return_value.messages.return_value.list.return_value.execute.return_value = {
                "messages": [{
                    "id": "TestId",
                    "threadId": "TestThreadId"
                }],
                "resultSizeEstimate": 0
            }
            data = self.Gmail.new_email_with_subject({
                "time": 0,
            }, {
                "subject": "TestSubject2"
            })
            time_datetime = datetime.strptime(time, '%a, %d %b %Y %H:%M:%S %z')
            mock.assert_called_once_with("gmail", "Gmail", self.user, self.db, "v1")
            self.assertEqual(data, (
                {
                    "time": 0
                }, {
                    "signal": False,
                    "data": []
                }))
    def tearDown(self) -> None:
        test_help_close_db(self.db)
