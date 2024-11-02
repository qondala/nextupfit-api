FROM flyway/flyway:latest

RUN apt-get update && apt-get install -y netcat

COPY docker/flyway/run-migrations.sh /flyway/bin/run-migrations.sh

RUN chmod +x /flyway/bin/run-migrations.sh

ENTRYPOINT ["/flyway/bin/run-migrations.sh"]
