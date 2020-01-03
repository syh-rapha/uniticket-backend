import { promisifyAll } from 'bluebird';
import redisConfig from '../config/redis';

const redis = require('redis');

promisifyAll(redis);

const client = redis.createClient(redisConfig);

module.exports = client;
