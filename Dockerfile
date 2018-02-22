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

EXPOSE 80

CMD apachectl -D FOREGROUND
