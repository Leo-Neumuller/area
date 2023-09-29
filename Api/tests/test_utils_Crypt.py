from src.utils.Crypt import *
import unittest


class TestCrypt(unittest.TestCase):
    def test_get_password_hash(self):
        self.assertTrue(isinstance(get_password_hash("Test1234"), str))

    def test_verify_password(self):
        self.assertTrue(verify_password("Test1234", get_password_hash("Test1234")))
        self.assertFalse(verify_password("Test1234", get_password_hash("Test12345")))
    
