FROM node:14.16-slim

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

EXPOSE 3003:3003

COPY . .

CMD npm start