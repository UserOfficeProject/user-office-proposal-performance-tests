FROM node:18.17.1-alpine

WORKDIR /usr/src/app

COPY /* ./

RUN npm ci

EXPOSE 8000

CMD ["npm", "run", "start:dev"]