import React, { useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'

const ADD_ITEM = gql`
  mutation AddItem($item: String!, $todolist_id: ID!) {
    addItem(item: $item, todolist_id: $todolist_id) {
      id
      name
      user_id
      items {
        item
      }
    }
  }
`
const Todolist = (props) => {
  const { id, items } = props.list
  const [item, setItem] = useState('')
  const [addItem] = useMutation(ADD_ITEM)

  const handleAddItem = () => {
    addItem({
      variables: { item: item, todolist_id: id }
    })
  }
  const handleChange = (evt) => {
    setItem(evt.target.value)
  }

  return (
    <div style={{ background: 'black', color: 'white' }}>
      <h3>List Items</h3>
      {items && items.map((el, i) => <div key={i}>{el.item}</div>)}
      <input
        onChange={handleChange}
        type="text"
        placeholder="add another item"
      />
      <Button onClick={() => handleAddItem()}>+</Button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.user.id
  }
}

export default connect(mapStateToProps)(Todolist)
