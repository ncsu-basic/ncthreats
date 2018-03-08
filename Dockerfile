FROM ubuntu:trusty

RUN apt-get update -y
RUN apt-get install -y apache2
RUN apt-get clean

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get install -y php5-common libapache2-mod-php5 php5-cli
RUN apt-get install -y php5-pgsql

RUN echo "It works!" > /var/www/html/index.html
RUN echo "<?php phpinfo();?>" > /var/www/html/info.php

ADD . /var/www/html/coa

RUN cp /var/www/html/coa/000-default.conf /etc/apache2/sites-available

RUN a2enmod ssl
RUN a2enmod proxy_balancer
RUN a2enmod proxy
RUN a2enmod proxy_http

EXPOSE 80

CMD apachectl -D FOREGROUND
