import React, { useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client';
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'


const GET_LISTS = gql`
  query Lists($user_id: Int! ) {
    lists (user_id: $user_id) {
      name
      id
    }
  }
`
const GET_ITEMS = gql`
query Items($todolist_ID: Int! ){
  items (todolist_ID: $todolist_ID ) {
    item
    id
  }
}
`;
const ADD_ITEM = gql`
mutation AddItem($item: String!, $todolist_id: Int!){
  addItem(item:$item,todolist_id:$todolist_id) {
    id
    item
    todolist_id
  }
}
`;
const todolist = (props) => {


  const [todolistid, settodolistid] = useState('')
  const [item, setItem] = useState("")

  const [addItem, { data }] = useMutation(ADD_ITEM)
  let lists = useQuery(GET_LISTS, { variables: { user_id: props.userId } })
  let items = useQuery(GET_ITEMS, { variables: { todolist_ID: todolistid } })

 

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
      {lists.data !== undefined && lists.data.lists.map(list => <div onClick={() => handleListClick(list.id)}>{list.name}</div>)}
      <div style={{ background: 'black', color: 'white' }}>
        <h3>List Items</h3>
        {items.data && items.data.items.map(item => <div>{item.item}</div>)}
        <input onChange={handleChange} type="text" placeholder="add another item" />
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