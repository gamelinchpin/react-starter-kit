#!/bin/bash
apt-get upgrade -y
apt-get update -y


# # install nodejs + npm.  (source: https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server)
# apt-get install -y curl
# curl -sL https://deb.nodesource.com/setup | bash -
# apt-get update -y
# # end ppa nodejs

apt-get install -y git nodejs build-essential libssl-dev

# Install packages
npm install

npm start
