# Use the official Node.js 10 image.
# https://hub.docker.com/_/node
FROM node:15-slim

# app
WORKDIR /usr/src/app

COPY ./src ./src
COPY package.json ./
COPY tsconfig.json ./

# install dependencies
RUN npm install


# debug
EXPOSE 8080
CMD [ "npm","run","start" ]
#CMD [ "npm","run","dev-start" ]

