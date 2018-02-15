# How to use the code with Docker

The Dockerfile is in the root directory. Run Docker from there.
The (cloned) source code is copied into the Docker image.

Build:

  docker build -t ncthreats .

Run:

  docker run -it -p8888:80 --rm ncthreats
