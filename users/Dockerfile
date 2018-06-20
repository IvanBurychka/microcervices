FROM node:latest

WORKDIR /usr/src/user

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002:3000

CMD [ "npm", "start" ]