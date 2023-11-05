import os
import unittest
from io import StringIO
from unittest.mock import patch

from tests.helper import async_test
from main import startup_event, root
from src.constants import Environment


class TestMain(unittest.TestCase):
    @async_test
    async def test_startup_event(self):
        async def basic_test():
            with patch('sys.stdout', new_callable=StringIO) as mock_stdout:
                await startup_event()
                output = mock_stdout.getvalue()
            return output

        output = await basic_test()
        self.assertTrue(output.startswith("Starting up with Env"))
        self.assertTrue(len(output.split("\n")) >= len(Environment.Settings().model_dump().keys()))
        os.environ["DOC"] = "True"
        output = await basic_test()
        self.assertTrue(output.startswith("Starting up with Env"))
        self.assertTrue(len(output.split("\n")) >= len(Environment.Settings().model_dump().keys()))
        del os.environ["DOC"]

    @async_test
    async def test_root(self):
        data = await root()
        self.assertTrue(isinstance(data, dict))
        self.assertTrue("name" in data.keys())
        self.assertTrue("version" in data.keys())
