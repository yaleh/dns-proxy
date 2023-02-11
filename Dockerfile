FROM node:12-alpine

WORKDIR /app

COPY . .

RUN npm install native-dns minimist ipaddr.js

CMD node index.js --dns $DNS --cidr $CIDR --domain $DOMAIN --port $PORT
