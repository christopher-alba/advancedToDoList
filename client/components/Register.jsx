import React, { Component } from 'react'
import { connect } from 'react-redux'
import { newUser } from '../store/actions/auth'
import { Button } from 'react-bootstrap'
import {setModalOpen, setModalName} from '../store/actions/modal'
import './register.css'
class Register extends Component {
  state = {
    email: undefined,
    fullName: undefined,
    password: undefined,
    confirmPassword: undefined,
    err: null
  }
  close = () => {
    this.props.setModalOpen(false)
    this.props.setModalName(null)
  }
  render() {
    return (
      <div className="registerContainer">
        <div>
          <form action="">
            <h1>Sign Up</h1>
            <hr/>

            <div className="inputContainer">
              <h4>Email</h4>
              <input type="email"  onChange={(evt) => this.setState({ email: evt.target.value })} />
            </div>
            <div className="inputContainer">
              <h4>Full Name</h4>
              <input type="text"  onChange={(evt) => this.setState({ fullName: evt.target.value })} />
            </div>
            <div className="inputContainer">
              <h4>Password</h4>
              <input type="password"  onChange={(evt) => this.setState({ password: evt.target.value })} />
            </div>
            <div className="inputContainer">
              <h4>Confirm Password</h4>
              <input type="password"  onChange={(evt) => this.setState({ confirmPassword: evt.target.value })} />
            </div>

            <Button variant = "dark" style={{fontSize:"1.5rem", borderRadius:"10px",paddingLeft:"50px", paddingRight: "50px", marginTop: "50px"}}onClick={async () => {

              try {
                await this.props.newUser({
                  email: this.state.email,
                  fullName: this.state.fullName,
                  password: this.state.password,
                  confirmPassword: this.state.confirmPassword
                })

                location.replace('/#/profile')
                this.close()
              } catch (err) {
                this.setState({ err: err.message })
              }
            }}>Sign Up</Button>
          </form>

          <p>{this.state.err}</p>
        </div>

      </div>
    )
  }
}

const mapDispatchToProps = {
  setModalOpen,
  setModalName,
  newUser
}

export default connect(undefined, mapDispatchToProps)(Register)