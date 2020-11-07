import React, { Component } from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

import { connect } from 'react-redux'

import { logout } from '../store/actions/auth'
import { setModalName, setModalOpen } from '../store/actions/modal'


class NavbarMain extends Component {
  handleOnClick = (route) => () => {
    this.props.setModalName(route)
    this.props.setModalOpen(true)
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/#/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/#/">Home</Nav.Link>
            {this.props.userId ? <Nav.Link href="/#/todolist">To Do List</Nav.Link> : ''}
          </Nav>
          <Nav className="ml-auto">
            {this.props.userId ? <Button style={{ marginRight: "10px" }} variant="dark" onClick={() => {
              this.props.logout()
              location.replace('/#/')
            }}>Logout</Button> : <Button  onClick={this.handleOnClick('login')} style={{ marginRight: "10px" }} variant="dark">Login</Button>}
            <Button onClick={this.handleOnClick('signup')} variant='dark'>Sign Up</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.auth.user.id
})

const mapDispatchToProps = {
  setModalOpen,
  setModalName,
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarMain)