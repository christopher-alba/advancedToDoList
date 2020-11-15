import React, { useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import ToDoList from './ToDoList'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'

export const GET_USER_LISTS = gql`
  query UserLists($user_id: ID!) {
    lists(user_id: $user_id) {
      id
      name
      user_id
      items {
        item
        id
      }
    }
  }
`
const DELETE_USER_LIST = gql`
  mutation DeleteList($id: ID!) {
    deleteList(id: $id) {
      id
    }
  }
`
const DELETE_LIST_ITEMS = gql`
  mutation DeleteListItems($todolist_id: ID!) {
    deleteItems(todolist_id: $todolist_id) {
      id
    }
  }
`
const UsersLists = (props) => {
  const [selected, setSelected] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  let { data, loading } = useQuery(GET_USER_LISTS, {
    variables: { user_id: props.userId }
  })
  const [deleteList] = useMutation(DELETE_USER_LIST, {
    refetchQueries: [
      {
        query: GET_USER_LISTS,
        variables: { user_id: props.userId }
      }
    ]
  })
  const [deleteListItems] = useMutation(DELETE_LIST_ITEMS)

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <main>
      <h1>Welcome to your to do list</h1>
      <h3>Lists</h3>
      {data &&
        data.lists.map((list, i) => (
          <div key={i} onClick={() => setSelected(list.id)}>
            {list.name}
          </div>
        ))}
      <Button variant='dark' onClick={async () => {
        await deleteListItems({variables: {todolist_id: selected}})
        deleteList({variables: {id: selected}})
      }}>Delete List</Button>
      <h3>List Items</h3>
      <ul>
        {selected && (
          <>
            {data && data.lists
              .find((el) => el.id === selected)
              .items.map((el, i) => (
                <li key={i} onClick={() => setSelectedItem(el.id)}>{el.item}</li>
              ))}
            <ToDoList userId={props.userId} todoId={selected} itemId={selectedItem} />
          </>
        )}
      </ul>
    </main>
  )
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.user.id
  }
}

export default connect(mapStateToProps)(UsersLists)
