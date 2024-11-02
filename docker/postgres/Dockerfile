FROM postgres:16

COPY docker/postgres/db-exists.sh /usr/bin/db-exists.sh
COPY docker/postgres/db-exists.sh /usr/bin/create-database.sh
# COPY docker/postgres/postgresql.conf /etc/postgresql/postgresql.conf

RUN chmod +x /usr/bin/db-exists.sh
RUN chmod +x /usr/bin/create-database.sh


CMD ["/usr/bin/create-database.sh"]
# Healthcheck to ensure database is up and running
# HEALTHCHECK --timeout=5s --start-period=3s --retries=3 CMD /usr/bin/db-exists.sh
