#!/bin/sh
set -e

# Synchroniser le schéma
echo "Starting the application"

j=0
while ! -f /usr/app/dist/main.js; do
   echo "-- Waiting dist files to be ready"
   echo "-- Content of dist /usr/app/dist :"
   ls -a /usr/app/dist
  j=$((j+1))
  if [ $j -ge 10 ]; then
    echo "-- Dist files not coming, please verify wether the build completed susccessfully. Giving up."
    exit 1
  fi
  sleep 5;
done;

pm2 start ecosystem.config.js

# Launch app
exec "$@"
