/* eslint-disable no-undef */
import { authenticatedUser, seedIngredients, seedAcl } from './mocks';

const request = require('supertest');
const app = require('../src/app.js');
const db = require('../src/database/db');
const redis = require('../src/database/redis');

let jwtToken;
const baseUrl = `${process.env.BASE_PATH}/menu`;

beforeAll(async () => {
  await db.raw('BEGIN TRANSACTION');
  await seedIngredients();
  await seedAcl();
  jwtToken = await authenticatedUser();
});

afterAll(async () => {
  await redis.quitAsync();
  await db.raw('ROLLBACK');
});

describe('menu crud', () => {
  test('should create a new menu', async () => {
    const res = await request(app)
      .post(baseUrl)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        closed: false,
        salad: 'Batata Doce',
        mainCourse: 'Carne de Panela',
        vegetarian: 'PTS',
        firstSideDish: 'Arroz Branco',
        secondSideDish: 'Feijão Carioca',
        dessert: 'Banana',
        day: '2020-01-01',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.type).toBe('application/json');
  });

  test('should retrieve a menu', async done => {
    const res = await request(app)
      .get(`${baseUrl}?day=2020-01-01`)
      .set('Authorization', `Bearer ${jwtToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          closed: false,
          salad: 'Batata Doce',
          mainCourse: 'Carne de Panela',
          vegetarian: 'PTS',
          firstSideDish: 'Arroz Branco',
          secondSideDish: 'Feijão Carioca',
          dessert: 'Banana',
          day: '2020-01-01T02:00:00.000Z',
        }),
      ])
    );
    done();
  });

  test('should update a menu', async done => {
    const res = await request(app)
      .put(`${baseUrl}/1`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        closed: false,
        salad: 'Batata Doce',
        mainCourse: 'Peixe Frito',
        vegetarian: 'Torta de Lentilha',
        firstSideDish: 'Arroz Integral',
        secondSideDish: 'Feijão Preto',
        dessert: 'Maça',
        day: '2020-01-01',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.type).toBe('application/json');
    done();
  });

  test('should delete a menu', async done => {
    const res = await request(app)
      .delete(`${baseUrl}/1`)
      .set('Authorization', `Bearer ${jwtToken}`);
    expect(res.statusCode).toEqual(204);
    done();
  });
});
