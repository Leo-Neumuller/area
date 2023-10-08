#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os

directories = [".", "Api", "App", "Website"]

env = {}

for directory in directories:
    try:
        with open(os.path.join(directory, ".env"), "r") as f:
            data = f.read()
    except FileNotFoundError:
        continue
    lines = data.split("\n")
    for line in lines:
        if line.startswith("#"):
            continue
        if "=" not in line:
            continue
        key, value = line.split("=")
        env[key] = value

with open(".env", "w") as f:
    for key, value in env.items():
        f.write(f"{key}={value}\n")
