#!/bin/sh

if [ "$1" = "tests" ]; then
  npm run test
else
  npm run start
fi
