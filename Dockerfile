FROM node:12

WORKDIR /app

COPY . .

RUN npm install native-dns minimist ipaddr.js

CMD ["node", "script.js", "--dns", "$DNS", "--cidr", "$CIDR", "--domain", "$DOMAIN", "--port", "$PORT"]