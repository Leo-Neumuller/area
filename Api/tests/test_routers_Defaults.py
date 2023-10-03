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
