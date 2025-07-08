FROM httpd:2.4

WORKDIR /usr/local/apache2/htdocs

ADD app entrypoint.sh ./

ENTRYPOINT [ "./entrypoint.sh" ]