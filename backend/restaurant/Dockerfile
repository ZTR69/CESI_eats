FROM node:latest
WORKDIR /restaurant
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node", "server.js" ]