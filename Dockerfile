# Dockerfile

# Node 20.15.0
FROM node:24-bookworm

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000