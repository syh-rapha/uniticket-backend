#!/bin/bash
while !</dev/tcp/${POSTGRES_HOST}/${POSTGRES_PORT}; do echo 'Aguardando conexão com Postgres'; sleep 1; done;
while !</dev/tcp/${REDIS_HOST}/${REDIS_PORT}; do echo 'Aguardando conexão com Redis'; sleep 1; done;
yarn migrate
yarn serve &
yarn queue
