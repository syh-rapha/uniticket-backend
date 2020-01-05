exports.up = async knex => {
  return knex.schema.createTable('ingredients', tbl => {
    tbl
      .bigIncrements('id')
      .primary()
      .unsigned();
    tbl.string('name', [100]).unique();
    tbl
      .enu('type', ['salad', 'main_course', 'side_dish', 'dessert'], {
        userNative: true,
        enumName: 'ingredient_type',
      })
      .defaultTo('main_course')
      .notNullable();
  });
};
exports.down = async knex => knex.schema.dropTableIfExists('ingredients');
