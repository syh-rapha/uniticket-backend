import db from '../database/db';

class Users {
  async getAll() {
    return db('Users').debug();
  }

  async insert(returning, insert) {
    return db('Users')
      .returning(returning)
      .insert(insert)
      .debug();
  }

  async update(returning, where, update) {
    return db('Users')
      .returning(returning)
      .where(where)
      .update(update)
      .debug();
  }

  async find(where) {
    return db('Users')
      .where(where)
      .debug();
  }
}

export default new Users();
