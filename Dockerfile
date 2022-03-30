FROM node:14
WORKDIR /pokemon_api
COPY package.json .
RUN yarn 
COPY . .
CMD yarn start