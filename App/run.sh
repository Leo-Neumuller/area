#!/bin/sh
if [ ! -d "node_modules" ]; then
  ./install.sh
fi
npm run start

