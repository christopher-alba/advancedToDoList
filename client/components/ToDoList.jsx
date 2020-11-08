import React, { useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'

const GET_ITEMS = gql`
  query Items($todolist_ID: Int!) {
    items(todolist_ID: $todolist_ID) {
      item
      id
    }
  }
`

const ADD_ITEM = gql`
  mutation AddItem($item: String!, $todolist_id: Int!) {
    addItem(item: $item, todolist_id: $todolist_id) {
      id
      item
      todolist_id
    }
  }
`
const todolist = (props) => {
  const [item, setItem] = useState('')

  const [addItem] = useMutation(ADD_ITEM, {
    update(cache, { data: { addItem } }) {
      cache.modify({
        fields: {
          items(existingItems = []) {
            const newItemRef = cache.writeFragment({
              data: addItem,
              fragment: gql`
                fragment NewItem on Item {
                  id
                  type
                }
              `
            })
            return [...existingItems, newItemRef]
          }
        }
      })
    }
  })

  const items = useQuery(GET_ITEMS, { variables: { todolist_ID: todolistid } })

  const handleListClick = (id) => {
    settodolistid(id)
  }
  const handleAddItem = () => {
    addItem({
      variables: { item: item, todolist_id: todolistid }
    })
  }
  const handleChange = (evt) => {
    setItem(evt.target.value)
  }
  return (
    <>
      <h1>Welcome to your to do list</h1>
      <h3>Lists</h3>
      {lists.data !== undefined &&
        lists.data.lists.map((list) => (
          <div onClick={() => handleListClick(list.id)}>{list.name}</div>
        ))}
      <div style={{ background: 'black', color: 'white' }}>
        <h3>List Items</h3>
        {items.data && items.data.items.map((item) => <div>{item.item}</div>)}
        <input
          onChange={handleChange}
          type="text"
          placeholder="add another item"
        />
        <Button onClick={() => handleAddItem()}>+</Button>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.user.id
  }
}

export default connect(mapStateToProps)(todolist)
