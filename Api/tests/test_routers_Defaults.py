import unittest
from src.routers.Defaults import *
from tests.helper import async_test
from fastapi import Request


class TestRoutersDefaults(unittest.TestCase):

    @async_test
    async def test_about(self):
        data = await about(Request(scope={
            "type": "http",
        }, receive=None, send=None))
        self.assertTrue(isinstance(data, About))

    @async_test
    async def test_client_apk_without_it(self):
        with self.assertRaises(HTTPException):
            await client(Request(scope={
                "type": "http",
            }, receive=None, send=None))

    @async_test
    async def test_client_apk_with_it(self):
        with open("client.apk", "w+") as f:
            f.write("Test")
        data = await client(Request(scope={
            "type": "http",
        }, receive=None, send=None))
        self.assertTrue(isinstance(data, FileResponse))

    def tearDown(self):
        try:
            os.remove("client.apk")
        except OSError:
            pass

