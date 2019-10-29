import knex from 'knex';
import knexfile from '../../knexfile';

const env = process.env.NODE_ENV;
const configOptions = knexfile[env];

export default knex(configOptions);
