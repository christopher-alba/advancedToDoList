exports.seed = function (knex) {
  // Inserts seed entries
  return knex('profiles').insert([
    { id: 1, user_id: 1, full_name: 'Proteus Hoteus' }
  ])
}
