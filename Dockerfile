FROM node:lts-alpine3.17

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

CMD ["sh", "-c", "sleep 10 && npm run db:deploy && npm run start"]