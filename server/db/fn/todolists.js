const connection = require('../connection')
const snakecaseKeys = require('snakecase-keys')
const getTodolists = (userID, db = connection) => {
  console.log(userID);
  return db('todolists')
    .where('user_id', userID)
    .select()
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error(err)
    })
}

const addTodolist = (list, userID, db = connection) => {
  return db('todolists')
    .insert(snakecaseKeys(list))
    .then(() => {
      return db('todolists')
        .where('name', list.name)
        .where('user_id', userID)
        .select()
        .first()
    })
    .catch(err => {
      console.error(err)
    })

}

const updateTodolist = (updates, userID, todolistID, db = connection) => {
  return db('todolists')
    .where('id', todolistID)
    .update(snakecaseKeys(updates))
    .then(() => {
      return getTodolists(userID)
        .then(todolists => todolists)
    })
    .catch(err => {
      console.error(err)
    })

}

const deleteTodolist = (todolistID, db = connection) => {
  return db('todolist')
    .where('id', todolistID)
    .delete()
    .then(() => todolistID)
    .catch(err => {
      console.error(err)
    })
}
module.exports = {
  getTodolists,
  addTodolist,
  updateTodolist,
  deleteTodolist
}