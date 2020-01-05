import { Router } from 'express';

import Users from './routes/users';
import Transactions from './routes/transactions';
import Ingredients from './routes/ingredients';
import Menu from './routes/menu';
import authenticationMiddleware from './middlewares/authentication';
import aclMiddleware from './middlewares/acl';

const routes = new Router();

routes.use('/users', Users);
routes.use(authenticationMiddleware);
routes.use(aclMiddleware);
routes.use('/transactions', Transactions);
routes.use('/Ingredients', Ingredients);
routes.use('/Menu', Menu);

export default routes;
