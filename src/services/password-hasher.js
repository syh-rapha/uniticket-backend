import bcrypt from 'bcryptjs';

const ROUNDS = 10;

class PasswordHasher {
  async hash(value) {
    return bcrypt.hash(value, ROUNDS);
  }

  async compare(providedValue, storedValue) {
    return bcrypt.compare(providedValue, storedValue);
  }
}

export default new PasswordHasher();
