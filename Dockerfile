FROM node:current-alpine

WORKDIR /server

COPY . /server

RUN npm install -g typescript

RUN npm install --silent

RUN npm audit fix --silent

RUN npm test

RUN rm -rf build && mkdir build

RUN tsc -p /server/src/

RUN npm prune --production --silent

EXPOSE 80