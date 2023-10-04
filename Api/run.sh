#!/bin/sh
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

if [ "$1" = "tests" ]; then
  coverage run --branch -m unittest discover -s tests -f && coverage report
else
  env/bin/uvicorn main:app --reload
fi

