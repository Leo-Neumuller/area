#!/bin/sh
if [ ! -d "node_modules" ]; then
  ./install.sh
fi


if [ "$1" = "tests" ]; then
  echo "No tests"
else
  npm run start
fi

