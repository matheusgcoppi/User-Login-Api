FROM node:19.0.1-alpine

WORKDIR /server

COPY prisma ./prisma/

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev" ]