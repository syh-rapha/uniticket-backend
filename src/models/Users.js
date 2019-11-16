import db from '../database/db';

class Users {
  async getAll() {
    return db('Users');
  }

  async insert(returning, insert) {
    return db('Users')
      .returning(returning)
      .insert(insert);
  }

  async update(returning, where, update) {
    return db('Users')
      .returning(returning)
      .where(where)
      .update(update);
  }

  async increment(returning, where, increment) {
    return db('Users')
      .returning(returning)
      .where(where)
      .increment(increment);
  }

  async decrement(returning, where, decrement) {
    return db('Users')
      .returning(returning)
      .where(where)
      .decrement(decrement);
  }

  async find(where) {
    return db('Users').where(where);
  }
}

export default new Users();
