import db from '../database/db';

class Acl {
  async find() {
    return db('acl');
  }
}

export default new Acl();
