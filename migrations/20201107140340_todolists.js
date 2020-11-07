
exports.up = function(knex) {
  return knex.schema.createTable('todolists', (t) => {
    t.increments('id').primary()
    t.integer('user_id').references('users.id')
    t.string('name').unique()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('todolists')
};
