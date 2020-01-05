exports.up = async knex => {
  return knex.schema.createTable('transactions', tbl => {
    tbl
      .bigIncrements('id')
      .primary()
      .unsigned();
    tbl
      .enu(
        'type',
        [
          'acquire_credits',
          'transfer_credits',
          'apply_credits',
          'remove_credits',
        ],
        {
          userNative: true,
          enumName: 'transaction_type',
        }
      )
      .defaultTo('acquire_credits')
      .notNullable();
    tbl
      .biginteger('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .index();
    tbl.timestamps(true, true);
  });
};

exports.down = async knex => knex.schema.dropTableIfExists('transactions');
