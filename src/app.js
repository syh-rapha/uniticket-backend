import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import Version from './routes/version';
import indexRouter from './index-router';

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
    this.server.use('/version', Version);
    this.server.use(process.env.BASE_PATH, indexRouter);
    this.server.use((err, req, res, next) => {
      if (err.name === 'ValidationError')
        res.status(422).json({ message: err.message });
      else if (err.table) res.status(500).json({ message: err.detail });
      else res.status(500).json(err);
    });
  }
}

module.exports = new App().server;
