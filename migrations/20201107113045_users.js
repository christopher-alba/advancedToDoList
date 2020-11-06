exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', t => {
    t.increments('id').primary()
    t.string('email').unique()
    t.string('password')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users')
}

