/* eslint-disable no-undef */
import { authenticatedUser, seedAcl } from './mocks';

const request = require('supertest');
const app = require('../src/app.js');
const db = require('../src/database/db');
const redis = require('../src/database/redis');

let jwt_token;
const baseUrl = `${process.env.BASE_PATH}/ingredients`;

beforeAll(async () => {
  await db.raw('BEGIN TRANSACTION');
  jwt_token = await authenticatedUser();
  await seedAcl();
});

afterAll(async () => {
  await redis.quitAsync();
  await db.raw('ROLLBACK');
});

describe('ingredients crud', () => {
  test('should create a new ingredient', async () => {
    const res = await request(app)
      .post(baseUrl)
      .set('Authorization', `Bearer ${jwt_token}`)
      .send({
        name: 'Camarão ao Molho Branco',
        type: 'main_course',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.type).toBe('application/json');
    expect(res.body).toEqual(
      expect.objectContaining({
        name: 'Camarão ao Molho Branco',
        type: 'main_course',
      })
    );
  });

  test('should retrieve all ingredients', async done => {
    const res = await request(app)
      .get(baseUrl)
      .set('Authorization', `Bearer ${jwt_token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Camarão ao Molho Branco',
          type: 'main_course',
        }),
      ])
    );
    done();
  });

  test('should update an ingredient', async done => {
    const res = await request(app)
      .put(baseUrl)
      .set('Authorization', `Bearer ${jwt_token}`)
      .send({
        oldName: 'Camarão ao Molho Branco',
        newName: 'Camarão ao Molho Madeira',
        newType: 'main_course',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.type).toBe('application/json');
    expect(res.body).toEqual(
      expect.objectContaining({
        name: 'Camarão ao Molho Madeira',
        type: 'main_course',
      })
    );
    done();
  });

  test('should delete an ingredient', async done => {
    const res = await request(app)
      .delete(baseUrl)
      .set('Authorization', `Bearer ${jwt_token}`)
      .send({
        name: 'Camarão ao Molho Madeira',
      });
    expect(res.statusCode).toEqual(204);
    done();
  });
});
