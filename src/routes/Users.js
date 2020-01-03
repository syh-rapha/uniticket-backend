import express from 'express';
import Users from '../controllers/Users';
import authenticationMiddleware from '../middlewares/Authentication';

const router = express.Router();

router.post('/', (req, res, next) => {
  Users.create(req, res);
});

router.post('/login', (req, res, next) => {
  Users.login(req, res);
});

router.get('/logout', authenticationMiddleware, (req, res, next) => {
  Users.logout(req, res);
});

router.post('/forgot_password', (req, res, next) => {
  Users.forgot_password(req, res);
});

router.post('/reset_password', (req, res, next) => {
  Users.reset_password(req, res);
});

router.get('/creation_confirmation', (req, res, next) => {
  Users.creation_confirmation(req, res);
});

export default router;
