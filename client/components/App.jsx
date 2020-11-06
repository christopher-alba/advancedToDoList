import React from 'react'
import Navbar from './Navbar'
import { Route } from 'react-router-dom'
import Login from './Login'
import Register from './Register'

const App = () => {
  return (
    <>
      <Navbar />
      <Route path='/login' exact component={Login} />
      <Route path='/register' exact component={Register} />
    </>
  )
}

export default App
