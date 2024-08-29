FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install nodemon

COPY . .

EXPOSE 8082

CMD [ "node", "server.js" ]

