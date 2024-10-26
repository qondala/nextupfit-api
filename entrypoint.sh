#!/bin/sh
set -e

# Synchroniser le schéma
npm run schema:sync
npm run seed

# Lancer l'application
exec "$@"

