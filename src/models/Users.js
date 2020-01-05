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
      .update({ ...update, updated_at: new Date() });
  }

  async increment(returning, where, increment) {
    return db('users')
      .returning(returning)
      .where(where)
      .increment(increment)
      .update({ updated_at: new Date() });
  }

  async find(where) {
    return db('users').where(where);
  }

  async findOne(where) {
    return db('users')
      .where(where)
      .first();
  }
}

export default new Users();
