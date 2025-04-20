#!/bin/sh
git fetch origin
git reset --hard origin/master
docker compose down
docker image rm nextupfit-api-moneydey-npf-api
docker compose up
