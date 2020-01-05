import db from '../database/db';

class Users {
  async getAll() {
    return db('transactions');
  }

  async insert(returning, insert) {
    return db('transactions')
      .returning(returning)
      .insert(insert);
  }

  async update(returning, where, update) {
    return db('transactions')
      .returning(returning)
      .where(where)
      .update({ ...update, updated_at: new Date() });
  }

  async increment(returning, where, increment) {
    return db('transactions')
      .returning(returning)
      .where(where)
      .increment(increment);
  }

  async find(where) {
    return db('transactions').where(where);
  }
}

export default new Users();
