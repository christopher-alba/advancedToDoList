import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import ToDoList from './ToDoList'
import { connect } from 'react-redux'

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

const UsersLists = (props) => {
  const [selected, setSelected] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  let { data, loading } = useQuery(GET_USER_LISTS, {
    variables: { user_id: props.userId }
  })

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
      <h3>List Items</h3>
      <ul>
        {selected && (
          <>
            {data.lists
              .find((el) => el.id === selected)
              .items.map((el, i) => (
                <li key={i} onClick = {() => setSelectedItem(el.id)}>{el.item}</li>
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
