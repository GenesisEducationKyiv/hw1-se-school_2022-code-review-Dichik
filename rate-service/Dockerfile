FROM node:latest

WORKDIR /rate-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081

CMD [ "npm", "start" ]