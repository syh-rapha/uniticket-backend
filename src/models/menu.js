import db from '../database/db';

class Menu {
  async getWeekMenu(startOfWeek, endOfWeek) {
    return db('menu')
      .whereBetween('day', [startOfWeek, endOfWeek])
      .orderBy('day');
  }

  async insert(returning, insert) {
    return db('menu')
      .returning(returning)
      .insert(insert);
  }

  async update(returning, where, update) {
    return db('menu')
      .returning(returning)
      .where(where)
      .update(update);
  }

  async delete(returning, where) {
    return db('menu')
      .returning(returning)
      .where(where)
      .del();
  }

  async find(where) {
    return db('menu').where(where);
  }
}

export default new Menu();
