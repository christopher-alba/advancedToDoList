import React from 'react'
import { useQuery, gql } from '@apollo/client'

import ToDoList from './ToDoList'

export const GET_LISTS = gql`
  query Lists($user_id: Int!) {
    lists(user_id: $user_id) {
      name
      id
    }
  }
`

const UserList = () => {
  const { data, loading } = useQuery(GET_LISTS, {
    variables: { user_id: props.userId }
  })
  if (loading) return <div>loading...</div>
  return (
    <div>
      {lists?.data &&
        data.lists.map((list) => (
          <div onClick={() => handleListClick(list.id)}>{list.name}</div>
        ))}
    </div>
  )
}

export default UserList
