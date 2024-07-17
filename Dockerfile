FROM node:20-alpine

# install PM2
RUN npm install pm2 -g

# create application root folder
RUN mkdir -p /app

# cd on the /app and execute subquent npm commands
WORKDIR /app

# copy everything
COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["pm2-runtime", "start", "./dist/src/main.js"]
