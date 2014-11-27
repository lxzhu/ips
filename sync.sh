#!/bin/sh
cd /var/www/ips
git pull >>gitpull.log 2>&1 3>&1
