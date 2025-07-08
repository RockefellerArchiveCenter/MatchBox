#!/bin/sh

set -e

# Replace environment variables in Javascript file.
for i in $(env)
do
    key=$(echo $i | cut -d '=' -f 1)
    value=$(echo $i | cut -d '=' -f 2-)
    sed -i'' "s|\${$key}|$value|g" js/app.js
done

# Start apache
httpd-foreground

