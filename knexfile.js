require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.POSTGRES_URL,
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: { directory: './src/database/seeds' },
  },

  test: {
    client: 'pg',
    connection: process.env.POSTGRES_TEST_URL,
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: { directory: './src/database/seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.POSTGRES_URL,
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: { directory: './src/database/seeds' },
  },
};
