import React, {Component} from 'react'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'

class LoginModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modal: false
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    this.setState({
      modal: !this.state.modal
    })
  }

  render () {
    return (
      <div>
        <Button onClick={this.toggle}>Login</Button>
        {/* <NavLink onClick={this.toggle}>{this.props.display}</NavLink> */}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalBody>
            {/* <Button>
              <a
                href="/auth/google"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                }}
              >Login with Google
              </a>
            </Button> */}
            IS THIS WORKING??????
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default LoginModal
