import db from '../database/db';

class Cardapio {
  async getCardapioSemana(comecoSemana, fimSemana) {
    return db('Cardapio')
      .whereBetween('dia', [comecoSemana, fimSemana])
      .orderBy('dia');
  }

  async insert(returning, insert) {
    return db('Cardapio')
      .returning(returning)
      .insert(insert);
  }

  async update(returning, where, update) {
    return db('Cardapio')
      .returning(returning)
      .where(where)
      .update(update);
  }

  async delete(returning, where) {
    return db('Cardapio')
      .returning(returning)
      .where(where)
      .del();
  }

  async find(where) {
    return db('Cardapio').where(where);
  }
}

export default new Cardapio();
