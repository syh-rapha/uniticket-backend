import 'dotenv/config';
import express from 'express';
import 'express-async-errors';

import Users from './routes/Users';
import Transactions from './routes/Transactions';
import authenticationMiddleware from './middlewares/Authentication';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use('/users', Users);
    this.server.use(authenticationMiddleware);
    this.server.use('/transactions', Transactions);
  }
}

export default new App().server;
