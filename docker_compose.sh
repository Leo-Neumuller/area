#!/bin/bash
export EXTERNAL_IP=$(hostname -I | awk '{print $1}')
docker compose build && docker compose up
