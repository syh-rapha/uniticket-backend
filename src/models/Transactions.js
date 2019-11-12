import db from '../database/db';

class Users {
  async getAll() {
    return db('Transactions');
  }

  async insert(returning, insert) {
    return db('Transactions')
      .returning(returning)
      .insert(insert);
  }

  async update(returning, where, update) {
    return db('Transactions')
      .returning(returning)
      .where(where)
      .update(update);
  }

  async increment(returning, where, increment) {
    return db('Transactions')
      .returning(returning)
      .where(where)
      .increment(increment);
  }

  async find(where) {
    return db('Transactions').where(where);
  }
}

export default new Users();
