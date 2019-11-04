import db from '../database/db';

class Users {
  async getAll() {
    return db('users');
  }

  async insert(returning, insert) {
    return db('users')
      .returning(returning)
      .insert(insert);
  }

  async update(returning, where, update) {
    return db('users')
      .returning(returning)
      .where(where)
      .update(update);
  }

  async find(where) {
    return db('users').where(where);
  }
}

export default new Users();
