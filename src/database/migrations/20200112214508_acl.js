exports.up = async knex => {
  return knex.schema.createTable('acl', tbl => {
    tbl
      .bigIncrements('id')
      .primary()
      .unsigned();
    tbl.string('route', [100]).notNullable();
    tbl.specificType('method', 'text[]').notNullable();
    tbl.specificType('authorized', 'text[]').notNullable();
  });
};

exports.down = async knex => knex.schema.dropTableIfExists('acl');
