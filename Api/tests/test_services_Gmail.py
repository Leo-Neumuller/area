import unittest
from src.services.Gmail import *


class TestServicesGmail(unittest.TestCase):
    def test_get_description(self):
        self.assertTrue(isinstance(Gmail().get_interface(), dict))
