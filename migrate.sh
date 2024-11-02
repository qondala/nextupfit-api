#!/bin/sh

# Make sure you already ran docker compose up and all the services are ready and healthy

docker exec -it nextupfit-postgres sh "/usr/bin/create-database.sh"
docker exec -it nextupfit-flyway sh "/flyway/bin/run-migrations.sh"
