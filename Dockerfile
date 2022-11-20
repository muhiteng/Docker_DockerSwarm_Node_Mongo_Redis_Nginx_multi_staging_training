FROM node:16

WORKDIR /app 

COPY package.json . 

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi


COPY . .

EXPOSE 4000

#CMD [ "npm","start" ]
CMD [ "npm","run","start-dev" ]   # this command we override it in docker-compose.dev.yml, docker-compose.prod.yml
