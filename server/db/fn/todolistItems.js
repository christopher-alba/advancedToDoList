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

const addTodolistItem = (item, db = connection) => {
  return db('todolistItems')
    .insert(snakecaseKeys(item))
    .where('todolist_id', item.todolist_id)
    .then(([id]) => getTodoItem(id))
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
  return db('todolistItems')
    .where('id', itemID)
    .delete()
    .then(() => itemID)
}

const deleteTodolistItems = (todolistID, db = connection) => {
  return db('todolistItems')
    .where('todolist_id', todolistID)
    .delete()
    .then(() => todolistID)
}
module.exports = {
  getTodolistItems,
  getTodoItem,
  addTodolistItem,
  updateTodolistItem,
  deleteTodolistItem,
  deleteTodolistItems
}
