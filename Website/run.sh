#!/bin/sh
if [ ! -d "node_modules" ]; then
  ./install.sh
fi


if [ "$1" = "prod" ]; then
  npm run build
  npm run preview
elif [ "$1" = "tests" ]; then
  npm run test
else
  npm run dev
fi