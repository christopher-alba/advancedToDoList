import React from 'react'
import { useQuery, gql, useMutation } from '@apollo/client';
import { connect } from 'react-redux'
const todolist = (props) => {

  const GET_LISTS = gql`
  query {
    lists (user_id: ${props.userId} ) {
      name
    }
  }
`;
  const lists = useQuery(GET_LISTS)
  console.log(lists);
  return (
    <>
      <h1>Welcome to your to do list</h1>
      {lists.data !== undefined && lists.data.lists.map(list => <div>{list.name}</div>)}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.user.id
  }
}

export default connect(mapStateToProps)(todolist)