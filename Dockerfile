FROM node:10-slim

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node package*.json ./

ENV NODE_ENV production

RUN yarn install

COPY --chown=node . .

RUN yarn build

ENV HOST=0.0.0.0 PORT=5000

EXPOSE ${PORT}

CMD [ "bash", "docker-entrypoint.sh" ]
