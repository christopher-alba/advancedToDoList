import React, { useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'

import { GET_USER_LISTS } from './UsersLists'

const ADD_ITEM = gql`
  mutation AddItem($item: String!, $todolist_id: ID!) {
    addItem(item: $item, todolist_id: $todolist_id) {
      id
    }
  }
`

const DELETE_ITEM = gql`
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`

const Todolist = (props) => {
  const [item, setItem] = useState('')
  const [addItem] = useMutation(ADD_ITEM, {
    refetchQueries: [
      {
        query: GET_USER_LISTS,
        variables: { user_id: props.userId }
      }
    ]
  })

  const [deleteItem] = useMutation(DELETE_ITEM, {
    refetchQueries: [
      {
        query: GET_USER_LISTS,
        variables: { user_id: props.userId }
      }
    ]
  })
  const handleAddItem = () => {
    addItem({
      variables: { item: item, todolist_id: props.todoId }
    })
  }
  const handleChange = (evt) => {
    setItem(evt.target.value)
  }

  return (
    <div style={{ background: 'black', color: 'white' }}>
      <input
        onChange={handleChange}
        type="text"
        placeholder="add another item"
      />
      <Button onClick={() => handleAddItem()}>+</Button>
      {props.itemId && (
        <Button
          variant="danger"
          onClick={() =>
            deleteItem({
              variables: { id: props.itemId }
            })
          }
        >
          Delete Item
        </Button>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.user.id
  }
}

export default connect(mapStateToProps)(Todolist)
