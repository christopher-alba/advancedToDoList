const connection = require('../connection')
const snakecaseKeys = require('snakecase-keys')
const getTodolists = (userID, db = connection) => {
  return db('todolists')
    .select()
    .where('todolists.user_id', userID)
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err)
    })
}

const getTodoList = (todoListID, db = connection) => {
  return (
    db('todolists')
      .select()
      // .join('todolistItems', 'todolists.id', 'todolistItems.todolist_id')
      .where('todolists.id', todoListID)
      .first()
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err)
      })
  )
}

const addTodolist = (list, userID, db = connection) =>
  db('todolists')
    .insert(snakecaseKeys(list))
    .then(() => db('todolists').where('user_id', userID).select())
    .catch(console.error)

const updateTodolist = (updates, todolistID, db = connection) => {
  return db('todolists')
    .where('id', todolistID)
    .update(snakecaseKeys(updates))
    .then(() => {
      return db('todolists').where('id', todolistID).select().first()
    })
    .catch((err) => {
      console.error(err)
    })
}

const deleteTodolist = (todolistID, db = connection) => {
  return db('todolists')
    .where('id', todolistID)
    .delete()
    .then(() => todolistID)
    .catch((err) => {
      console.error(err)
    })
}
module.exports = {
  getTodolists,
  getTodoList,
  addTodolist,
  updateTodolist,
  deleteTodolist
}
