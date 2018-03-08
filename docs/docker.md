# How to use the code with Docker

The Dockerfile is in the root directory. Run Docker from there.
The (cloned) source code is copied into the Docker image.

In `js/ncthreats.js` change the URLs to the correct URLs with ports
(adding post number to localhost should be enough).
Update the connection string in `pages/connect.php`.

Build:

```
docker build -t ncthreats .
```

Run:

```
docker run -it -p 8888:80 --rm ncthreats
```

To connect to local PostgreSQL server on host, the following needs to be added to its
`/etc/postgresql/9.3/main/pg_hba.conf` file.

```
host     all             all             172.17.0.1/16           password
````

Test:

http://localhost:8888/index.html
http://localhost:8888/info.php
http://localhost:8888/info.php
http://localhost:8888/coa/pages/mountains.php
http://localhost:8888/coa/

To connect to a database in Docker:

```
docker run -it --net ncthreats_default -p 8888:80 --rm ncthreats
```

To fill the database in Docker:

```
docker run -it --rm --net ncthreats_default \
    -v .../dump_ncthreats_12_10_17.sql:/dump_ncthreats_12_10_17.sql \
    postgres psql -h db -U postgres -d postgres
```

```
\i /dump_ncthreats_12_10_17.sql

or

-f /dump_ncthreats_12_10_17.sql
```

To run the database part of software:

```
docker-compose -f docker-compose.yml up
```

For tests:

psql is in the postgresql-client

Logs are in:

```
/var/log/apache2/
```

To modify the proxy settings in `000-default.conf` need to be modified
based on the IP obtained using:

```
docker ps
docker network ls
docker network inspect ncthreats_default
```
