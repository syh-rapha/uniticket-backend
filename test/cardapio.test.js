/* eslint-disable no-undef */
import { authenticatedUser, seedIngredientes } from './mocks';

const request = require('supertest');
const app = require('../src/app.js');
const db = require('../src/database/db');

let jwt_token;

beforeAll(async () => {
  await db.raw('BEGIN TRANSACTION');
  await seedIngredientes();
  jwt_token = await authenticatedUser();
});

afterAll(async () => {
  await db.raw('ROLLBACK');
});

describe('crud de cardapio', () => {
  test('deve criar um novo cardapio', async () => {
    const res = await request(app)
      .post('/cardapio')
      .set('Authorization', `Bearer ${jwt_token}`)
      .send({
        fechado: false,
        salada: 'Batata Doce',
        principal: 'Carne de Panela',
        acompanhamento_1: 'Arroz Branco',
        acompanhamento_2: 'Feijão Carioca',
        sobremesa: 'Banana',
        dia: '2020-01-01',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.type).toBe('application/json');
  });

  test('deve recuperar um cardapio', async done => {
    const res = await request(app)
      .get('/cardapio?dia=2020-01-01')
      .set('Authorization', `Bearer ${jwt_token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fechado: false,
          salada: 'Batata Doce',
          principal: 'Carne de Panela',
          acompanhamento_1: 'Arroz Branco',
          acompanhamento_2: 'Feijão Carioca',
          sobremesa: 'Banana',
        }),
      ])
    );
    done();
  });

  test('deve alterar um cardapio', async done => {
    const res = await request(app)
      .put('/cardapio')
      .set('Authorization', `Bearer ${jwt_token}`)
      .send({
        fechado: false,
        salada: 'Batata Doce',
        principal: 'Peixe Frito',
        acompanhamento_1: 'Arroz Integral',
        acompanhamento_2: 'Feijão Preto',
        sobremesa: 'Maça',
        dia: '2020-01-01',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.type).toBe('application/json');
    done();
  });

  test('deve excluir um cardapio', async done => {
    const res = await request(app)
      .delete('/cardapio?dia=2020-01-01')
      .set('Authorization', `Bearer ${jwt_token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.type).toBe('application/json');
    done();
  });
});
