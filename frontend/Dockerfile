FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
COPY .env .env

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview", "--", "--host"]
