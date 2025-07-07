FROM httpd:2.4

RUN apt-get update

WORKDIR /usr/local/apache2/htdocs

ADD app entrypoint.sh ./

ENTRYPOINT [ "./entrypoint.sh" ]