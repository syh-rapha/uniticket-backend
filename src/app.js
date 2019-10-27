import express from 'express';

import Users from './routes/Users';
import authenticationMiddleware from './middlewares/Authentication';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    // this.server.use(
    //   '/files',
    //   express.static(path.resolve(__dirname, '..', 'temp', 'uploads'))
    // );
  }

  routes() {
    this.server.use('/users', Users);
    this.server.use(authenticationMiddleware);
  }
}

export default new App().server;
