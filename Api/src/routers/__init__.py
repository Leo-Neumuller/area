import os
import importlib
from fastapi import APIRouter

current_dir = os.path.dirname(__file__)

routers = {}

for filename in os.listdir(current_dir):
    if filename.endswith(".py") and filename != "__init__.py":
        module_name = os.path.splitext(filename)[0]
        module = importlib.import_module(f"{__name__}.{module_name}")
        for name in dir(module):
            obj = getattr(module, name)
            if isinstance(obj, APIRouter):
                routers[name] = obj
