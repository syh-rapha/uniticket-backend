import 'dotenv/config';
import express from 'express';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import 'express-async-errors';

import Users from './routes/Users';
import Transactions from './routes/Transactions';
import sentryConfig from './config/sentry';
import authenticationMiddleware from './middlewares/Authentication';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
  }

  routes() {
    this.server.use('/users', Users);
    this.server.use(authenticationMiddleware);
    this.server.use('/transactions', Transactions);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (error, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(error, req).toJSON();
        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
