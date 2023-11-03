import os
import importlib

current_dir = os.path.dirname(__file__)

services = {}

for filename in os.listdir(current_dir):
    if filename.endswith(".py") and filename != "__init__.py":
        module_name = os.path.splitext(filename)[0]
        module = importlib.import_module(f"{__name__}.{module_name}")
        for name in dir(module):
            obj = getattr(module, name)
            print(module_name, name, hasattr(obj, "__class__"), hasattr(obj, "__class__") and obj.__class__.__name__ == "type", hasattr(obj, "__class__") and obj.__class__.__name__ == "type" and obj.__name__ == module_name.title())
            if hasattr(obj, "__class__") and obj.__class__.__name__ == "type":
                print(obj.__name__, module_name.title())
            if hasattr(obj, "__class__") and obj.__class__.__name__ == "type" and obj.__name__ == module_name.title():
                services[obj.get_name()] = obj
