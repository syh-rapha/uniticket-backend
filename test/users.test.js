/* eslint-disable no-undef */
import { authenticatedUser } from './mocks';

const request = require('supertest');
const app = require('../src/app.js');
const db = require('../src/database/db');
const redis = require('../src/database/redis');

let confirmationToken;
let resetToken;
let jwtToken;
const baseUrl = `${process.env.BASE_PATH}/users`;

const creationConfirmationCodeMock = async () => {
  const queryResult = await db('users')
    .where({ email: 'raphaelfrnc@gmail.com' })
    .select('confirmation_token')
    .first();
  confirmationToken = queryResult.confirmationToken;
};

const resetPasswordCodeMock = async () => {
  const queryResult = await db('users')
    .where({ email: 'raphaelfrnc@gmail.com' })
    .select('reset_token')
    .first();
  resetToken = queryResult.resetToken;
};

beforeAll(async () => {
  await db.raw('BEGIN TRANSACTION');
  jwtToken = await authenticatedUser();
});

afterAll(async () => {
  await redis.quitAsync();
  await db.raw('ROLLBACK');
});

describe('user crud and authentication', () => {
  test('should create a new user', async () => {
    const res = await request(app)
      .post(baseUrl)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        name: 'Raphael Franco',
        email: 'raphaelfrnc@gmail.com',
        password: 'senha123',
        passwordConfirmation: 'senha123',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.type).toBe('application/json');
  });

  test('should activate an user account', async done => {
    await creationConfirmationCodeMock();
    const res = await request(app).get(
      `${baseUrl}/creation-confirmation/?confirmation_token=${confirmationToken}`
    );
    expect(res.statusCode).toEqual(204);
    done();
  });

  test('should login into application', async done => {
    const res = await request(app)
      .post(`${baseUrl}/login`)
      .send({
        email: 'raphaelfrnc@gmail.com',
        password: 'senha123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.type).toBe('application/json');
    expect(res.body.token).toBeDefined();
    done();
  });

  test('should request password redefinition', async done => {
    const res = await request(app)
      .post(`${baseUrl}/forgot-password`)
      .send({
        email: 'raphaelfrnc@gmail.com',
      });
    expect(res.statusCode).toEqual(204);
    done();
  });

  test('should reset a password', async done => {
    await resetPasswordCodeMock();
    const res = await request(app)
      .post(`${baseUrl}/reset-password/?reset_token=${resetToken}`)
      .send({
        password: 'novaSenha123',
        passwordConfirmation: 'novaSenha123',
      });
    expect(res.statusCode).toEqual(204);
    done();
  });
});
