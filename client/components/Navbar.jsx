import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { logout } from '../store/actions/auth'
import { connect } from 'react-redux'

class NavbarMain extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            {this.props.userId ? <Button style={{ marginRight: "10px" }} variant="dark" onClick={() => {
              this.props.logout()
              location.replace('/#/')
            }}>Logout</Button> : <Button href='/#/login'style={{ marginRight: "10px" }} variant="dark">Login</Button>}
            <Button href="/#/register" variant='dark'>Sign Up</Button>
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
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarMain)