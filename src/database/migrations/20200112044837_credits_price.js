exports.up = async knex => {
  return knex.schema.createTable('credits_price', tbl => {
    tbl.string('role', [100]).primary();
    tbl.decimal('price').notNullable();
  });
};

exports.down = async knex => knex.schema.dropTableIfExists('credits_price');
