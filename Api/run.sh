#!/bin/sh
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
venv/bin/uvicorn main:app --reload

