FROM php:5.6-fpm

MAINTAINER Dmitri Lakachauskis <lakiboy83@gmail.com>

# PHP config
COPY php.ini /usr/local/etc/php/conf.d/

# Install composer
RUN cd /usr/local/bin \
    && php -r "readfile('https://getcomposer.org/installer');" | php \
    && mv composer.phar composer

# Install extensions
RUN apt-get update && apt-get install -y \
            libssl-dev \
            libicu-dev g++ \
    && pecl install mongo \
    && rm -r /var/lib/apt/lists/*

RUN echo "extension=mongo.so" > /usr/local/etc/php/conf.d/mongo.ini
RUN docker-php-ext-install mbstring intl

COPY init.sh /init.sh

RUN ["chmod", "+x", "/init.sh"]

WORKDIR /var/www/symfony

CMD ["/init.sh"]
