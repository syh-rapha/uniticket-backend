import knex from 'knex';
import knexStringcase from 'knex-stringcase';

import knexfile from '../knexfile';

const configOptions = knexfile[process.env.NODE_ENV];
const encapsulatedOptions = knexStringcase(configOptions);

module.exports = knex(encapsulatedOptions);
