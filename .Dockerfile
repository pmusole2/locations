FROM node:14.15.4-alpine3.12

WORKDIR /app

COPY package*.json  ./

RUN npm install

COPY . .

RUN npm run build


EXPOSE 9201
CMD [ "npm", "run", "start:prod" ]