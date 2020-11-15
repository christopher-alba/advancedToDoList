import React, { useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import ToDoList from './ToDoList'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'
import './usersLists.css'

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

const ADD_USER_LIST = gql`
  mutation AddList($user_id: ID!, $name: String!) {
    addList(user_id: $user_id, name: $name) {
      id
      name
      user_id
    }
  }
`

const UsersLists = (props) => {
  const [selected, setSelected] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [listName, setListName] = useState(null)
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
  const [addList] = useMutation(ADD_USER_LIST, {
    refetchQueries: [
      {
        query: GET_USER_LISTS,
        variables: { user_id: props.userId }
      }
    ]
  })

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div className="mainContainer">
      <div>
        <h1>Welcome to your to do list</h1>
        <h3>Lists</h3>
        {data &&
          data.lists.map((list, i) => (
            <div key={i} className={list.id === selected ? 'selectedList' : ''} onClick={() => {
              setSelected(list.id)
              setSelectedItem(null)
            }}>
              {list.name}
            </div>
          ))}
        {selected && <Button variant='dark' onClick={async () => {
          await setSelected(null)
          await deleteListItems({ variables: { todolist_id: selected } })
          deleteList({ variables: { id: selected } })

        }}>Delete List</Button>}
        <input type="text" onChange={(evt) => setListName(evt.target.value)} />
        <Button onClick={() => {
          addList({ variables: { user_id: props.userId, name: listName } })
        }}>+</Button>
        {selected && <h3>List {data.lists.find((el) => el.id === selected).name} Items</h3>}
        <div>
          {selected && (
            <>
              {data.lists
                .find((el) => el.id === selected)
                .items.map((el, i) => (
                  <div className={el.id === selectedItem ? 'selectedItem' : ''} key={i} onClick={() => setSelectedItem(el.id)}>{el.item}</div>
                ))}
            </>
          )}
        </div>
        {selected && <ToDoList userId={props.userId} todoId={selected} itemId={selectedItem} />}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.user.id
  }
}

export default connect(mapStateToProps)(UsersLists)
