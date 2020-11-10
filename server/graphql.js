const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull
} = require('graphql')

const List = require('./db/fn/todolists')
const Item = require('./db/fn/todolistItems')

// ===========Types=============
const UserType = new GraphQLObjectType({
  name: 'user',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    email: { type: GraphQLNonNull(GraphQLString) },
    lists: {
      type: new GraphQLList(ListType),
      resolve: (p) => List.getTodolists(p.user_id)
    }
  })
})

const ItemType = new GraphQLObjectType({
  name: 'item',
  description: 'This represents an item of a list',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    item: { type: GraphQLNonNull(GraphQLString) },
    todolist_id: { type: GraphQLNonNull(GraphQLID) }
  })
})

const ListType = new GraphQLObjectType({
  name: 'list',
  description: 'This represents a list of a user',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
    user_id: { type: GraphQLNonNull(GraphQLID) },
    items: {
      type: new GraphQLList(ItemType),
      resolve: (p) => Item.getTodolistItems(p.id)
    }
  })
})

// ===========QUERY=============
const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: {
    list: {
      type: ListType,
      description: 'A list of lists',
      args: {
        id: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve: (_, args) => List.getTodoList(args.id)
    },
    lists: {
      type: new GraphQLList(ListType),
      description: 'A list of lists',
      args: {
        user_id: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve: (_, args) => List.getTodolists(args.user_id)
    },
    items: {
      type: new GraphQLList(ItemType),
      description: 'A list of items',
      args: {
        todolist_id: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve: (parent, args) => Item.getTodolistItems(args.todolist_id)
    }
  }
})

// ==========MUTATION===========
const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'root mutation',
  fields: {
    // LIST
    addList: {
      type: GraphQLList(ListType),
      description: 'add a list',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        user_id: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve: (_, args) => {
        const list = { name: args.name, user_id: args.user_id }
        let dblist = List.addTodolist(list, args.user_id)
        console.log(dblist)
        return dblist
      }
    },
    updateList: {
      type: ListType,
      description: 'updates a list',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        user_id: { type: GraphQLNonNull(GraphQLID) },
        id: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve: (parent, args) => {
        const list = { name: args.name, user_id: args.user_id }
        let dblist = List.updateTodolist(list, args.id)
        return dblist
      }
    },
    deleteList: {
      type: ListType,
      description: 'deletes a list',
      args: {
        id: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve: (parent, args) => {
        let dblist = List.deleteTodolist(args.id)
        return {
          id: dblist
        }
      }
    },
    // ITEM
    addItem: {
      type: ListType,
      description: 'add an item',
      args: {
        todolist_id: { type: GraphQLNonNull(GraphQLID) },
        item: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: (_, { todolist_id, item }) =>
        Item.addTodolistItem({ todolist_id, item })
    },
    updateItem: {
      type: new GraphQLList(ItemType),
      description: 'updates an item',
      args: {
        item: { type: GraphQLNonNull(GraphQLString) },
        todolist_id: { type: GraphQLNonNull(GraphQLID) },
        id: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve: (parent, args) => {
        const list = { item: args.item, todolist_id: args.todolist_id }
        let dblist = Item.updateTodolistItem(list, args.id)
        return dblist
      }
    },
    deleteItem: {
      type: ItemType,
      description: 'deletes an item',
      args: {
        id: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve: (parent, args) => {
        let dblist = Item.deleteTodolistItem(args.id)
        return {
          id: dblist
        }
      }
    }
  }
})

// EXPORT SCHEMA
module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})
