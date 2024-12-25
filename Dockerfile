FROM node:20.11-alpine

WORKDIR /personal-website/

COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "start"]