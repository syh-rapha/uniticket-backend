exports.up = async knex => {
  return knex.schema.createTable('menu', tbl => {
    tbl
      .bigIncrements('id')
      .primary()
      .unsigned();
    tbl
      .string('salad', [100])
      .references('name')
      .inTable('ingredients');
    tbl
      .string('main_course', [100])
      .references('name')
      .inTable('ingredients');
    tbl
      .string('first_side_dish', [100])
      .references('name')
      .inTable('ingredients');
    tbl
      .string('second_side_dish', [100])
      .references('name')
      .inTable('ingredients');
    tbl
      .string('dessert', [100])
      .references('name')
      .inTable('ingredients');
    tbl.date('day').notNullable();
    tbl
      .boolean('closed')
      .notNullable()
      .defaultTo(false);
  });
};

exports.down = async knex => knex.schema.dropTableIfExists('menu');
