
exports.up = function(knex) {
  return knex.schema.createTable('todolistItems', (t) => {
    t.increments('id').primary()
    t.integer('todolist_id').references('todolists.id')
    t.string('item')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('todolistItems')
};
