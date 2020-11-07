const connection = require('../connection')
const snakecaseKeys = require('snakecase-keys')
const getTodolistItems = (userID, db = connection) => {
  return db('todolistItems')
    .where('user_id', userID)
    .select()
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error(err)
    })
}

const addTodolistItem = (item, userID, db = connection) => {
  return db('todolistItems')
    .insert(snakecaseKeys(item))
    .then(() => {
      return getTodolistItems(userID)
    })
}

const updateTodolistItem = (updates, todolistID, db = connection) => {
  return db('todolistItems')
    .where('todolist_id', todolistID)
    .update(snakecaseKeys(updates))
    .then(() => {
      return getTodolistItems(todolistID)
    })
}

const deleteTodolistItem = (itemID, db = connection) => {
  return db('todolist')
    .where('id', itemID)
    .delete()
    .then(() => itemID)
}
module.exports = {
  getTodolistItems,
  addTodolistItem,
  updateTodolistItem,
  deleteTodolistItem
}