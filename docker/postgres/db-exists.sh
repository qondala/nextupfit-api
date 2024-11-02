#!/bin/sh

$( pg_isready && psql -lqt | cut -d \| -f 1 | grep -qw $POSTGRES_DB )
