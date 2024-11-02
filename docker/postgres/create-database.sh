#!/bin/sh

echo "Attempting to create database $POSTGRES_DB in case it hasn't been before..."

sleep 10;

j=0
while ! $( pg_isready ); do
  echo "-- Waiting for db container to be ready..."
  j=$((j+1))
  if [ $j -ge 10 ]; then
    echo "-- Db container was not able to start, giving up db verification."
    exit 1
  fi
  sleep 5;
done;

echo "-- Db container is ready."

# Attempting to create database (in case it hasn't before)
if $( psql -lqt | cut -d \| -f 1 | grep -qw "$POSTGRES_DB" ); then
  echo "-- Database $POSTGRES_DB already exists."
else
  echo "-- Creating database $POSTGRES_DB."
  psql --quiet -U $POSTGRES_DB -c "CREATE DATABASE $POSTGRES_DB;" || :
fi

echo "-- Nextupfit db is available at URL: jdbc:postgresql://$POSTGRES_HOST:$POSTGRES_PORT/$POSTGRES_DB"

exec "$@"
