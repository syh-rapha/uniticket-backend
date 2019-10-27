import knex from 'knex';
import knexfile from '../config/knexfile';
import 'dotenv/config';

const env = process.env.NODE_ENV;
const configOptions = knexfile[env];

export default knex(configOptions);
