require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.REMOTE_DB_URL,
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: { directory: './src/database/seeds' },
  },

  testing: {
    client: 'pg',
    connection: process.env.REMOTE_DB_URL,
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: { directory: './src/database/seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.REMOTE_DB_URL,
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: { directory: './src/database/seeds' },
  },
};
