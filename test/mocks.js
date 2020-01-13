const request = require('supertest');
const app = require('../src/app.js');
const db = require('../src/database/db');

export const authenticatedUser = async () => {
  await db('users').insert({
    name: 'Raphael',
    email: 'raphaelfrnc@outlook.com',
    password: '$2y$08$5i6QrTVQZHZcakJ8r1OjHeVOfhkSPLRv5ey/A4j7CiMDj5dYRe6D2',
    role: 'admin',
    active: true,
  });
  const res = await request(app)
    .post(`${process.env.BASE_PATH}/users/login`)
    .send({
      email: 'raphaelfrnc@outlook.com',
      password: 'senha123',
    });
  return res.body.token;
};

export const seedIngredients = async () => {
  const ingredients = [
    {
      name: 'Batata Doce',
      type: 'salad',
    },
    {
      name: 'Carne de Panela',
      type: 'main_course',
    },
    {
      name: 'Arroz Branco',
      type: 'side_dish',
    },
    {
      name: 'Feijão Carioca',
      type: 'side_dish',
    },
    {
      name: 'Banana',
      type: 'dessert',
    },
    {
      name: 'Peixe Frito',
      type: 'main_course',
    },
    {
      name: 'Arroz Integral',
      type: 'side_dish',
    },
    {
      name: 'Feijão Preto',
      type: 'side_dish',
    },
    {
      name: 'Maça',
      type: 'dessert',
    },
    {
      name: 'PTS',
      type: 'vegetarian',
    },
    {
      name: 'Torta de Lentilha',
      type: 'vegetarian',
    },
  ];
  return db.batchInsert('ingredients', ingredients, 9);
};

export const seedAcl = async () => {
  const acl = [
    {
      route: '/transactions/acquire-credits',
      method: '{"POST"}',
      authorized: '{"admin", "student", "servant", "visitor"}',
    },
    {
      route: '/ingredients',
      method: '{"GET", "POST", "PUT", "DELETE"}',
      authorized: '{"admin"}',
    },
    {
      route: '/menu',
      method: '{"POST", "PUT", "DELETE"}',
      authorized: '{"admin"}',
    },
    {
      route: '/menu',
      method: '{"GET"}',
      authorized: '{"admin", "student", "servant", "visitor"}',
    },
  ];
  return db.batchInsert('acl', acl, 4);
};

export const noop = () => {};
