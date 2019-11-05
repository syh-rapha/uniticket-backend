exports.up = async knex => {
  return knex.schema.createTable('Transactions', tbl => {
    tbl
      .bigIncrements('id')
      .primary()
      .unsigned();
    tbl
      .enu(
        'type',
        [
          'adquirir_credito',
          'transferir_credito',
          'aplicar_credito',
          'remover_credito',
        ],
        {
          userNative: true,
          enumName: 'transaction_type',
        }
      )
      .defaultTo('adquirir_credito')
      .notNullable();
    tbl
      .biginteger('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('Users')
      .index();
    tbl.timestamps(true, true);
  });
};

exports.down = async knex => knex.schema.dropTableIfExists('Transactions');
