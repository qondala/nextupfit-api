FROM node:20-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install pm2 -g

COPY entrypoint.sh /usr/app/entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]

CMD ["pm2-runtime", "start", "dist/src/main.js"]

