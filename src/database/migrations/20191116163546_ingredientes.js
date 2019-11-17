exports.up = async knex => {
  return knex.schema.createTable('Ingredientes', tbl => {
    tbl.string('nome', [100]).primary();
    tbl
      .enu('tipo', ['salada', 'principal', 'acompanhamento', 'sobremesa'], {
        userNative: true,
        enumName: 'ingrediente_type',
      })
      .defaultTo('principal')
      .notNullable();
  });
};
exports.down = async knex => knex.schema.dropTableIfExists('Ingredientes');
