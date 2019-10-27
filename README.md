# UniTicket Backend

Repositório destinado ao backend da aplicação UniTicket

## Dependências

Para instalar as dependências do projeto execute o comando

`yarn`

## Executar

Para executar a aplicação

`yarn dev`

## Migrations

As tabelas do banco de dados devem ser criadas e/ou alteradas através das migrations

### Criar Migration

`npx knex migrate:make nome_da_migration`

### Executar Migration

`yarn migrate`

### Desfazer Migration

`yarn rollback`

## Envs

Para o correto funcionamento da aplicação é necessário configurar as variáveis de ambiente. Para isso, crie o arquivo `.env` na raiz do projeto e defina as variáveis conforme o padrão contido em `.env.example`.
