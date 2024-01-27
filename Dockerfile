FROM nginx:1.25.3-alpine3.18

COPY /dist/sj /usr/share/nginx/html

EXPOSE 80
