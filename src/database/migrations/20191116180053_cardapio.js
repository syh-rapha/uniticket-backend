exports.up = async knex => {
  return knex.schema.createTable('Cardapio', tbl => {
    tbl
      .bigIncrements('id')
      .primary()
      .unsigned();
    tbl
      .string('salada', [100])
      .references('nome')
      .inTable('Ingredientes');
    tbl
      .string('principal', [100])
      .references('nome')
      .inTable('Ingredientes');
    tbl
      .string('acompanhamento_1', [100])
      .references('nome')
      .inTable('Ingredientes');
    tbl
      .string('acompanhamento_2', [100])
      .references('nome')
      .inTable('Ingredientes');
    tbl
      .string('sobremesa', [100])
      .references('nome')
      .inTable('Ingredientes');
    tbl.date('dia').notNullable();
    tbl
      .boolean('fechado')
      .notNullable()
      .defaultTo(false);
  });
};

exports.down = async knex => knex.schema.dropTableIfExists('Cardapio');
