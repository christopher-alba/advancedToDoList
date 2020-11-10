import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import ToDoList from './ToDoList'
import { connect } from 'react-redux'

const GET_USER_LISTS = gql`
  query UserLists($user_id: ID!) {
    lists(user_id: $user_id) {
      id
      name
      user_id
      items {
        item
      }
    }
  }
`

const UsersLists = (props) => {
  const [selectedList, setSelectedList] = useState(null)
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
          <div
            key={i}
            onClick={() => setSelectedList({ id: list.id, items: list.items })}
          >
            {list.name}
          </div>
        ))}
      {selectedList && <ToDoList list={selectedList} />}
    </main>
  )
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.user.id
  }
}

export default connect(mapStateToProps)(UsersLists)
