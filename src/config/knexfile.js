const path = require('path');
require('dotenv').config({ path: path.resolve('../../.env') });

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.REMOTE_DB_URL,
    migrations: {
      directory: '../database/migrations',
    },
    seeds: { directory: '../database/seeds' },
  },

  testing: {
    client: 'pg',
    connection: process.env.REMOTE_DB_URL,
    migrations: {
      directory: '../database/migrations',
    },
    seeds: { directory: '../database/seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.REMOTE_DB_URL,
    migrations: {
      directory: '../database/migrations',
    },
    seeds: { directory: '../database/seeds' },
  },
};
