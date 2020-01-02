/* eslint-disable no-undef */
import { authenticatedUser } from './mocks';

const request = require('supertest');
const app = require('../app');
const db = require('../database/db');

let jwt_token;

beforeAll(async () => {
  await db.raw('BEGIN TRANSACTION');
  jwt_token = await authenticatedUser();
});

afterAll(async () => {
  await db.raw('ROLLBACK');
});

describe('gerenciamento de transações', () => {
  test('deve adquirir créditos', async () => {
    const res = await request(app)
      .post('/transactions/adquirir-creditos')
      .set('Authorization', `Bearer ${jwt_token}`)
      .send({
        quantidadeCreditos: 11,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.type).toBe('application/json');
    expect(res.body.creditos).toEqual(11);
  });
});
