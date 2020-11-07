const connection = require('../connection')
const snakecaseKeys = require('snakecase-keys')
const getTodolists = (userID, db = connection) => {
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
      return getTodolists(userID)
    })
}

const updateTodolist = (updates, userID, todolistID, db = connection) => {
  return db('todolists')
    .where('id', todolistID)
    .update(snakecaseKeys(updates))
    .then(() => {
      return getTodolists(userID)
    })
}

const deleteTodolist = (todolistID, db = connection) => {
  return db('todolist')
    .where('id', todolistID)
    .delete()
    .then(() => todolistID)
}
module.exports = {
  getTodolists,
  addTodolist,
  updateTodolist,
  deleteTodolist
}