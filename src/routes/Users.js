import express from 'express';
import Users from '../controllers/Users';

const router = express.Router();

router.post('/', (req, res, next) => {
  res.json('Cadastro usuário');
});

router.post('/login', (req, res, next) => {
  // res.json('Login usuário');
  Users.login(req, res);
});

router.get('/forgot_password', (req, res, next) => {
  res.json('Esqueceu senha');
});

router.get('/reset_password', (req, res, next) => {
  res.json('Esqueceu senha');
});

export default router;
