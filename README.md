# UniTicket Backend

Repositório destinado ao backend da aplicação UniTicket

## Executar

### Desenvolvimento

Para executar a aplicação em modo de desenvolvimento configure as variáveis de
ambiente (exceto as da API) no arquivo `docker-compose.yaml`. Utilizando o modelo
do arquivo `env.example` crie um arquivo na raiz do projeto nomeado `.env` e 
configure as variáveis de ambiente da API. Em seguida execute os seguintes comandos:

`docker-compose up -d --build postgres_uniticket redis_uniticket postgres_test_uniticket`

`yarn dev`

Caso queira a funcionalidade de envio de emails abra um novo terminal e execute:

`yarn queue`

### Produção

Para executar a aplicação em modo de produção remova a configuração do serviço de
banco de dados de testes do arquivo `docker-compose.yaml` e configure as variáveis
de ambiente presentes no arquivo. Em seguida execute o seguinte comando:

`docker-compose up -d --build` 

## Testes

Com a aplicação configurada no modo de desenvolvimento, execute:

`yarn test`

## Migrations

As tabelas do banco de dados devem ser criadas e/ou alteradas através das migrations

### Criar Migration

`npx knex --knexfile src/knexfile.js migrate:make nome_da_migration`

### Executar Migration

`yarn migrate`

### Desfazer Migration

`yarn rollback`
