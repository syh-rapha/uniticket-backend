import express from 'express';
import AccountController from '../controllers/AccountController';

const router = express.Router();

router.post('/login', (req, res, next) => {
  res.json('Login usuário');
  // AccountController.login(req, res);
});

router.get('/forgot_password', (req, res, next) => {
  res.json('Esqueceu senha');
});

router.get('/create', (req, res, next) => {
  res.json('Cadastro usuário');
});

export default router;
