import express from 'express';
import Users from '../controllers/Users';

const router = express.Router();

router.post('/', (req, res, next) => {
  Users.create(req, res);
});

router.post('/login', (req, res, next) => {
  Users.login(req, res);
});

router.get('/logout', (req, res, next) => {
  Users.logout(req, res);
});

router.post('/forgot_password', (req, res, next) => {
  Users.forgot_password(req, res);
});

router.post('/reset_password/:token', (req, res, next) => {
  Users.reset_password(req, res);
});

router.get('/creation_confirmation/:token', (req, res, next) => {
  Users.creation_confirmation(req, res);
});

export default router;
