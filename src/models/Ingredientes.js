import db from '../database/db';

class Ingredientes {
  async getAll() {
    return db('Ingredientes').orderBy([{ column: 'tipo' }, { column: 'nome' }]);
  }

  async insert(returning, insert) {
    return db('Ingredientes')
      .returning(returning)
      .insert(insert);
  }

  async update(returning, where, update) {
    return db('Ingredientes')
      .returning(returning)
      .where(where)
      .update(update);
  }

  async delete(returning, where) {
    return db('Ingredientes')
      .returning(returning)
      .where(where)
      .del();
  }

  async find(where) {
    return db('Ingredientes').where(where);
  }
}

export default new Ingredientes();
