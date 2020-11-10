import React, { useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'

const GET_ITEMS = gql`
  query Items($todolist_ID: ID!) {
    items(todolist_id: $todolist_ID) {
      item
      id
    }
  }
`

const ADD_ITEM = gql`
  mutation AddItem($item: String!, $todolist_id: ID!) {
    addItem(item: $item, todolist_id: $todolist_id) {
      id
      item
      todolist_id
    }
  }
`
const Todolist = (props) => {
  const [item, setItem] = useState('')
  console.log(props)
  const [addItem] = useMutation(ADD_ITEM, {
    update: (cache, data) => {
      // cache.modify({
      //   fields: {
      //     items(existingItems = []) {
      //       const newItemRef = cache.writeFragment({
      //         data: addItem,
      //         fragment: gql`
      //           fragment NewItem on Item {
      //             id
      //             item
      //             todolist_id
      //           }
      //         `
      //       })
      //       console.log(existingItems)
      //       return [...existingItems, newItemRef]
      //     }
      //   }
      // })
    }
  })

  const items = useQuery(GET_ITEMS, {
    variables: { todolist_ID: props.todolistid }
  })

  const handleAddItem = () => {
    addItem({
      variables: { item: item, todolist_id: props.todolistid }
    })
  }
  const handleChange = (evt) => {
    setItem(evt.target.value)
  }

  if (items.loading) return <div>loading...</div>
  return (
    <div style={{ background: 'black', color: 'white' }}>
      <h3>List Items</h3>
      {items.data &&
        items.data.items.map((item, i) => <div key={i}>{item.item}</div>)}
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
