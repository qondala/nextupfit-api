#!/bin/sh

# Attendre que PostgreSQL soit prêt
until nc -z -v -w30 $DATABASE_HOST $DATABASE_PORT
do
  echo "Waiting for database connection..."
  sleep 1
done

# Synchroniser le schéma
npm run schema:sync
npm run seed

# Lancer l'application
exec "$@"

