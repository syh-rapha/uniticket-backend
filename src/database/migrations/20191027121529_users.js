exports.up = async knex => {
  return knex.schema.createTable('users', tbl => {
    tbl.increments();
    tbl.string('name').notNullable();
    tbl.string('email').notNullable();
    tbl.string('password').notNullable();
    tbl
      .boolean('active')
      .defaultTo(false)
      .notNullable();
    tbl
      .boolean('admin')
      .defaultTo('false')
      .notNullable();
    tbl.integer('jwt_exp_time');
    tbl.string('reset_token', [16]);
    tbl.string('confirmation_token', [16]);
    tbl.timestamps(true, true);
  });
};

exports.down = async knex => knex.schema.dropTableIfExists('users');
