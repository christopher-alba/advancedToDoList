import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import ToDoList from './ToDoList'
import { connect } from 'react-redux'

const GET_LISTS = gql`
  query Lists($user_id: ID!) {
    lists(user_id: $user_id) {
      id
      name
      user_id
    }
  }
`

const UsersLists = (props) => {
  const [todolistid, settodolistid] = useState('')
  let { data, loading } = useQuery(GET_LISTS, {
    variables: { user_id: props.userId }
  })

  const handleListClick = (id) => {
    settodolistid(id)
  }

  if (loading) {
    return <div>Loading...</div>
  }
  console.log(data)
  return (
    <>
      <h1>Welcome to your to do list</h1>
      <h3>Lists</h3>
      {data &&
        data.lists.map((list, i) => (
          <div key={i} onClick={() => handleListClick(list.id)}>
            {list.name}
          </div>
        ))}
      {todolistid && <ToDoList todolistid={todolistid} />}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.user.id
  }
}

export default connect(mapStateToProps)(UsersLists)
