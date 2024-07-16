FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install pm2 -g

EXPOSE 3000

CMD ["pm2-runtime", "start", "dist/main.js"]
