const request = require('supertest');
const app = require('../src/app.js');
const db = require('../src/database/db');

export const authenticatedUser = async () => {
  await db('Users').insert({
    name: 'Raphael',
    email: 'raphaelfrnc@outlook.com',
    password: '$2y$08$5i6QrTVQZHZcakJ8r1OjHeVOfhkSPLRv5ey/A4j7CiMDj5dYRe6D2',
    role: 'admin',
    active: true,
  });
  const res = await request(app)
    .post('/users/login')
    .send({
      email: 'raphaelfrnc@outlook.com',
      password: 'senha123',
    });
  return res.body.token;
};

export const seedIngredientes = async () => {
  const ingredientes = [
    {
      nome: 'Batata Doce',
      tipo: 'salada',
    },
    {
      nome: 'Carne de Panela',
      tipo: 'principal',
    },
    {
      nome: 'Arroz Branco',
      tipo: 'acompanhamento',
    },
    {
      nome: 'Feijão Carioca',
      tipo: 'acompanhamento',
    },
    {
      nome: 'Banana',
      tipo: 'sobremesa',
    },
    {
      nome: 'Peixe Frito',
      tipo: 'principal',
    },
    {
      nome: 'Arroz Integral',
      tipo: 'acompanhamento',
    },
    {
      nome: 'Feijão Preto',
      tipo: 'acompanhamento',
    },
    {
      nome: 'Maça',
      tipo: 'sobremesa',
    },
  ];
  await db.batchInsert('Ingredientes', ingredientes, 9);
};

export const noop = () => {};
