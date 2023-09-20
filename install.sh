#!/bin/sh
echo "Installing dependencies for Api"
(cd Api && ./install.sh)
echo "Installing dependencies for App"
(cd App && ./install.sh)
echo "Installing dependencies for Website"
(cd Website && ./install.sh)