FROM node:20-alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install
COPY . .
COPY .env ./

RUN npm run build
# EXPOSE 3000
CMD ["npm", "run", "start"]
