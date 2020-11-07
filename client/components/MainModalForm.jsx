import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import Fade from 'react-reveal/Fade'

import Login from './Login'
import Signup from './Register'
import { setModalOpen, setModalName } from '../store/actions/modal'

class Auth extends Component {
  close = () => {
    this.props.setModalOpen(false)
    this.props.setModalName(null)
  }

  render() {
    const { open, modal } = this.props
    return (
      <Modal
        className="modalMainContainer"
        show={open}
        onHide={this.close}
        centered
      >
        <Fade>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modalContentContainer">
            {modal === 'signup' && <Signup />}
            {modal === 'login' && <Login />}
          </Modal.Body>
        </Fade>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  modal: state.modal.name,
  open: state.modal.open
})

const mapDispatchToProps = {
  setModalOpen,
  setModalName
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
