#!/bin/bash
export EXTERNAL_IP=$(hostname -I | awk '{print $1}')
docker compose build client_web && docker compose build server && docker compose up
# exec docker compose build client_mobile

