from src.utils.RegexChecker import *
import unittest


class TestRegexChecker(unittest.TestCase):
    def test_check_email(self):
        self.assertTrue(check_email("test@test.com"))
        self.assertFalse(check_email("test@test"))
        self.assertFalse(check_email("test.com"))
        self.assertFalse(check_email("test@.com"))
        self.assertFalse(check_email("test@test."))
        self.assertFalse(check_email("test@.test."))

    def test_check_password(self):
        self.assertTrue(check_password("Test1234"))
        self.assertFalse(check_password("test1234"))
        self.assertFalse(check_password("Test"))
        self.assertFalse(check_password("1234"))
        self.assertFalse(check_password("test"))
        self.assertFalse(check_password("TEST"))
        self.assertFalse(check_password("TEST1234"))
        self.assertFalse(check_password("test1234"))
        self.assertFalse(check_password("Test1234!"))
        self.assertFalse(check_password("Test1234?"))
        self.assertFalse(check_password("Test1234."))
        self.assertFalse(check_password("Test1234,"))
