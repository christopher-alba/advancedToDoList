import React from 'react'
import Navbar from './Navbar'
import { Route } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import MainModalForm from './MainModalForm'

const App = () => {
  return (
    <>
      <Navbar />
      <MainModalForm/>
    </>
  )
}

export default App
