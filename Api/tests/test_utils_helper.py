import unittest
import warnings
from unittest.mock import patch

import src.utils.Helper
from src.utils.Helper import warn


class TestUtilsHelper(unittest.TestCase):
    def test_warn(self):
        with patch.object(src.utils.Helper, "inTestMode") as mock:
            with warnings.catch_warnings(record=True) as w:
                mock.return_value = False
                warn("Test")
                self.assertEqual(len(w), 1)


