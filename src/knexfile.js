require('dotenv').config({ path: '../.env' });

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.POSTGRES_URL,
    migrations: {
      directory: './database/migrations',
    },
    seeds: { directory: './database/seeds' },
  },

  test: {
    client: 'pg',
    connection: process.env.POSTGRES_TEST_URL,
    migrations: {
      directory: './database/migrations',
    },
    seeds: { directory: './database/seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.POSTGRES_URL,
    migrations: {
      directory: './database/migrations',
    },
    seeds: { directory: './database/seeds' },
  },
};
