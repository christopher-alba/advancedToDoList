const bcrypt = require('bcrypt')
const { v4 } = require()

exports.seed = async function (knex) {
  let password = await bcrypt.hash('123456', 10)
  // Inserts seed entries
  return knex('users').insert([
    { id: v4(), email: 'proteus@gmail.com', password: password }
  ])
}
