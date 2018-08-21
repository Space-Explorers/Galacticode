import React, {Component} from 'react'
import Popup from 'reactjs-popup'
import {Link} from 'react-router-dom'

class Victory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    }
  }

  closeModal = () => {
    this.setState({
      open: false
    })
  }

  render() {
    return (
      <div>
        <Popup
          open={this.state.open}
          onClose={this.closeModal}
        >
          <div className="modal">
            <button className="btn btn-close" onClick={this.closeModal}>Close</button>
            <div className="header"> CONGRATULATIONS! </div>
            <div className="content">
              <p>
                Well done! You now have enough fuel to travel to the next planet!<br />Would you like to continue?
              </p>
            </div>
            <div className="actions">
              <Link to="/">
                <button type="button" onClick={this.closeModal}> Yes, take me away!</button>
              </Link>
              <Link to="/play">
                <button type="button" onClick={this.closeModal}>No, I'll stay.</button>
              </Link>
            </div>
          </div>
        </Popup>
      </div>
    )
  }
}

export default Victory
