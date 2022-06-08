FROM node:16.15-alpine

ENV REACT_APP_BASE_URL=https://karmafarm-app.herokuapp.com/

ENV NODE_ENV = production

WORKDIR /var/www

COPY . .

COPY 