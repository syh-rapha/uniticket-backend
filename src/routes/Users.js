import express from 'express';
import Users from '../controllers/users';
import authenticationMiddleware from '../middlewares/authentication';
import aclMiddleware from '../middlewares/acl';

const router = express.Router();

router.post('/', authenticationMiddleware, aclMiddleware, Users.create);

router.post('/login', Users.login);

router.get('/logout', authenticationMiddleware, Users.logout);

router.post('/forgot-password', Users.forgotPassword);

router.post('/reset-password', Users.resetPassword);

router.get('/creation-confirmation', Users.creationConfirmation);

export default router;
