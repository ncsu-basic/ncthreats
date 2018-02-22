# How to use the code with Docker

The Dockerfile is in the root directory. Run Docker from there.
The (cloned) source code is copied into the Docker image.

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
