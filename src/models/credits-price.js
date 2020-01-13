import db from '../database/db';

class CreditsPrice {
  async findOne(where) {
    return db('credits-price')
      .where(where)
      .first();
  }
}

export default new CreditsPrice();
