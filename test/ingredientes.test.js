/* eslint-disable no-undef */
import { authenticatedUser } from './mocks';

const request = require('supertest');
const app = require('../src/app.js');
const db = require('../src/database/db');

let jwt_token;

beforeAll(async () => {
  await db.raw('BEGIN TRANSACTION');
  jwt_token = await authenticatedUser();
});

afterAll(async () => {
  await db.raw('ROLLBACK');
});

describe('crud de ingredientes', () => {
  test('deve criar um novo ingrediente', async () => {
    const res = await request(app)
      .post('/ingredientes')
      .set('Authorization', `Bearer ${jwt_token}`)
      .send({
        nome: 'Camarão ao Molho Branco',
        tipo: 'principal',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.type).toBe('application/json');
  });

  test('deve recuperar todos os ingredientes', async done => {
    const res = await request(app)
      .get('/ingredientes')
      .set('Authorization', `Bearer ${jwt_token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          nome: 'Camarão ao Molho Branco',
          tipo: 'principal',
        }),
      ])
    );
    done();
  });

  test('deve alterar um ingrediente', async done => {
    const res = await request(app)
      .put('/ingredientes')
      .set('Authorization', `Bearer ${jwt_token}`)
      .send({
        nome_antigo: 'Camarão ao Molho Branco',
        nome: 'Camarão ao Molho Madeira',
        tipo: 'principal',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.type).toBe('application/json');
    done();
  });

  test('deve excluir um ingrediente', async done => {
    const res = await request(app)
      .delete('/ingredientes')
      .set('Authorization', `Bearer ${jwt_token}`)
      .send({
        nome: 'Camarão ao Molho Madeira',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.type).toBe('application/json');
    done();
  });
});
