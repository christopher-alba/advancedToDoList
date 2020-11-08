import React, {useState} from 'react'
import { useQuery, gql } from '@apollo/client'
import ToDoList from './ToDoList'
import { connect } from 'react-redux'
const GET_LISTS = gql`
  query Lists($user_id: Int! ) {
    lists (user_id: $user_id) {
      name
      id
    }
  }
`

const UsersLists = (props) => {
  const [todolistid, settodolistid] = useState('')
  let lists = useQuery(GET_LISTS, { variables: { user_id: props.userId } })



  const handleListClick = (id) => {
    settodolistid(id)
  }

  if (lists.loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h1>Welcome to your to do list</h1>
      <h3>Lists</h3>
      { lists.data !== undefined && lists.data.lists.map(list => <div onClick={() => handleListClick(list.id)}>{list.name}</div>)}
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