FROM ubuntu:trusty

RUN apt-get update -y
RUN apt-get install -y apache2
RUN apt-get clean

RUN echo "It works!" > /var/www/html/index.html

ADD . /var/www/html/coa

EXPOSE 80

CMD apachectl -D FOREGROUND
