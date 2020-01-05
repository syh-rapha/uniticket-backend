import db from '../database/db';

class Ingredients {
  async getAll() {
    return db('ingredients').orderBy([{ column: 'type' }, { column: 'name' }]);
  }

  async insert(returning, insert) {
    return db('ingredients')
      .returning(returning)
      .insert(insert);
  }

  async update(returning, where, update) {
    return db('ingredients')
      .returning(returning)
      .where(where)
      .update(update);
  }

  async delete(returning, where) {
    return db('ingredients')
      .returning(returning)
      .where(where)
      .del();
  }

  async find(where) {
    return db('ingredients').where(where);
  }
}

export default new Ingredients();
