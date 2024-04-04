FROM node:latest
WORKDIR /user
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node", "server.js" ]