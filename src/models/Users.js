import db from '../database/db';

class Users {
  async getAll() {
    return db('users');
  }

  async findByEmail(email) {
    return db('users').where({
      email,
    });
  }

  async add(name, email, password, confirmation_token) {
    return db('users')
      .returning(['id', 'name', 'email'])
      .insert({
        name,
        email,
        password,
        confirmation_token,
      });
  }

  async setResetToken(email, reset_token) {
    return db('users')
      .returning('name')
      .where({ email })
      .update({
        reset_token,
      });
  }
}

export default new Users();
