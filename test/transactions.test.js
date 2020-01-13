/* eslint-disable no-undef */
import { authenticatedUser, seedAcl } from './mocks';

const request = require('supertest');
const app = require('../src/app.js');
const db = require('../src/database/db');
const redis = require('../src/database/redis');

let jwt_token;
const baseUrl = `${process.env.BASE_PATH}/transactions`;

beforeAll(async () => {
  await db.raw('BEGIN TRANSACTION');
  jwt_token = await authenticatedUser();
  await seedAcl();
});

afterAll(async () => {
  await redis.quitAsync();
  await db.raw('ROLLBACK');
});

describe('transactions management', () => {
  test('should acquire credits', async () => {
    const res = await request(app)
      .post(`${baseUrl}/acquire-credits`)
      .set('Authorization', `Bearer ${jwt_token}`)
      .send({
        creditsQuantity: 11,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.type).toBe('application/json');
    expect(res.body.credits).toEqual(11);
  });
});
