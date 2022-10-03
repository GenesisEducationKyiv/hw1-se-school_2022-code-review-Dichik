FROM node:10

WORKDIR /subscription-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9081

CMD [ "npm", "start" ]