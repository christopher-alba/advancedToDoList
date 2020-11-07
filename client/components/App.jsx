import React from 'react'
import Navbar from './Navbar'
import { Route } from 'react-router-dom'
import MainModalForm from './MainModalForm'
import Home from './Home'
import ToDoList from './ToDoList'
const App = () => {
  return (
    <>
      <Navbar />
      <Route exact path = '/' component = {Home}/>
      <Route exact path = '/todolist' component = {ToDoList}/>
      <MainModalForm/>
    </>
  )
}

export default App
