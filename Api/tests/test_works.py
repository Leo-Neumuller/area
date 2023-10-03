import unittest


class TestSum(unittest.TestCase):

    def test_sum(self):
        self.assertEqual(2 + 2, 4, "Should be 4")

    def test_multiply(self):
        self.assertEqual(2 * 2, 4, "Should be 4")
