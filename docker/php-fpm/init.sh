#!/bin/bash
set -e

env | grep SYMFONY_ | sed -r 's/^(.+)=(.+)$/env[\1]=\2/g' >> /usr/local/etc/php-fpm.conf

exec php-fpm
