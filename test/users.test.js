/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../src/app.js');
const db = require('../src/database/db');

let confirmation_token;
let reset_token;

const creationConfirmationCodeMock = async () => {
  const queryResult = await db('Users')
    .where({ email: 'raphaelfrnc@gmail.com' })
    .select('confirmation_token');
  confirmation_token = queryResult[0].confirmation_token;
};

const resetPasswordCodeMock = async () => {
  const queryResult = await db('Users')
    .where({ email: 'raphaelfrnc@gmail.com' })
    .select('reset_token');
  reset_token = queryResult[0].reset_token;
};

beforeAll(async () => {
  await db.raw('BEGIN TRANSACTION');
});

afterAll(async () => {
  await db.raw('ROLLBACK');
});

describe('criação de usuário e autenticação', () => {
  test('deve criar um novo usuário', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'Raphael Franco',
        email: 'raphaelfrnc@gmail.com',
        password: 'senha123',
        password_confirmation: 'senha123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.type).toBe('application/json');
  });

  test('deve ativar a conta de um usuário', async done => {
    await creationConfirmationCodeMock();
    const res = await request(app).get(
      `/users/creation_confirmation/?confirmation_token=${confirmation_token}`
    );
    expect(res.statusCode).toEqual(204);
    done();
  });

  test('deve realizar login na aplicação', async done => {
    const res = await request(app)
      .post('/users/login')
      .send({
        email: 'raphaelfrnc@gmail.com',
        password: 'senha123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.type).toBe('application/json');
    expect(res.body.token).toBeDefined();
    done();
  });

  test('deve solicitar redefinição de senha', async done => {
    const res = await request(app)
      .post('/users/forgot_password')
      .send({
        email: 'raphaelfrnc@gmail.com',
      });
    expect(res.statusCode).toEqual(204);
    done();
  });

  test('deve redefinir uma senha', async done => {
    await resetPasswordCodeMock();
    const res = await request(app)
      .post(`/users/reset_password/?reset_token=${reset_token}`)
      .send({
        password: 'novaSenha123',
        password_confirmation: 'novaSenha123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.type).toBe('application/json');
    done();
  });
});
