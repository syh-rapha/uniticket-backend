import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import Version from './routes/version';
import indexRouter from './index-router';
import ErrorHandler from './errors/error-handler';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use('/version', Version);
    this.server.use(process.env.BASE_PATH, indexRouter);
    this.server.use((err, req, res, next) => {
      ErrorHandler.getError(err, res);
    });
  }
}

module.exports = new App().server;
