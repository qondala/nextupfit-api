#!/bin/sh

dbUrl="jdbc:postgresql://$POSTGRES_HOST:$POSTGRES_PORT/$DATABASE_NAME"

j=0
while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
  echo "Attempting to run nextupfit database migrations at URL: $dbUrl"
  j=$((j+1))
  if [ $j -ge 10 ]; then
    echo "Cannot run database migrations: $POSTGRES_HOST:$POSTGRES_PORT not reachable, giving up."
    exit 1
  fi
  sleep 5;
done;

flyway -defaultSchema=public -baselineOnMigrate=true -url=$dbUrl -user=$POSTGRES_USER -password=$POSTGRES_PASSWORD migrate

exec "$@"
