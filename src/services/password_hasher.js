import bcrypt from 'bcryptjs';

const ROUNDS = 10;

class PasswordHasher {
  async hash(value) {
    return bcrypt.hash(value, ROUNDS);
  }

  async compare(provided_value, stored_value) {
    return bcrypt.compare(provided_value, stored_value);
  }
}

export default new PasswordHasher();
