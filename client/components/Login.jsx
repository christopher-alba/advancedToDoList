import React, { Component } from 'react'
import { connect } from 'react-redux'
import { authUser } from '../store/actions/auth'
import {setModalOpen, setModalName} from '../store/actions/modal'
import { Button } from 'react-bootstrap'
import './register.css'
class Logins extends Component {

  state = {
    email: '',
    password: '',
    err: null
  }
  handleClick = async () => {

    try {
      await this.props.authUser({ email: this.state.email, password: this.state.password })
      location.replace("/#/profile")
      this.close()
    } catch (err) {
      this.setState({ err })
    }
  }
  close = () => {
    this.props.setModalOpen(false)
    this.props.setModalName(null)
  }
  render() {
    return (
      <div className="registerContainer">
        <div>
          <h1>Log In</h1>
          <hr />
          <div className="inputContainer">
            <input type="email" placeholder="email" onChange={(evt) => {

              this.setState({ email: evt.target.value })

            }} />
          </div>
          <div className="inputContainer">
            <input type="password" placeholder="password" onChange={(evt) => {

              this.setState({ password: evt.target.value })

            }} />
          </div>


          <Button variant="dark" style={{ fontSize: "1.5rem", borderRadius: "10px", paddingLeft: "50px", paddingRight: "50px", marginTop: "50px" }} onClick={() => this.handleClick()}>Log In</Button>
          <p>{this.state.err && this.state.err.message}</p>
        </div>


      </div>
    )
  }
}

const mapDispatchToProps = {
  setModalOpen,
  setModalName,
  authUser
}

export default connect(undefined, mapDispatchToProps)(Logins)