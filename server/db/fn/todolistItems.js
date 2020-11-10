const connection = require('../connection')
const snakecaseKeys = require('snakecase-keys')
const getTodolistItems = (todolistID, db = connection) => {
  return db('todolistItems')
    .where('todolist_id', todolistID)
    .select()
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err)
    })
}

const getTodoItem = (itemId, db = connection) =>
  db('todolistItems')
    .select()
    .where('id', itemId)
    .first()
    .catch((err) => console.log(err))

const getUserTodoList = (todolistID, db = connection) =>
  db('todolists')
    .select()
    .where('id', todolistID)
    .first()
    .catch((err) => console.log(err))

const addTodolistItem = (item, db = connection) => {
  return db('todolistItems')
    .insert(snakecaseKeys(item))
    .where('todolist_id', item.todolist_id)
    .then(() => getUserTodoList(item.todolist_id))
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
  getTodoItem,
  addTodolistItem,
  updateTodolistItem,
  deleteTodolistItem
}
