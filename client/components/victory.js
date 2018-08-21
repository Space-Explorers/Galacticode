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
          contentStyle={{
            background: "none",
            border: "none",
            position: "absolute",
            margin: "auto",
            top: "200px",
            right: "0",
            left: "0",
            width: "700px"
          }}
          open={this.state.open}
          onClose={this.closeModal}
        >
          <div className="modal">
            <div className="close">
              <button className="btn btn-close" onClick={this.closeModal}>Close</button>
            </div>
            <div className="header"><h1>CONGRATULATIONS!</h1></div>
            <div className="content">
              <p>
                Well done! You now have enough fuel to travel to the next planet!<br />Would you like to continue?
              </p>
            </div>
            <div className="actions">
              <Link to="/">
                <button type="button" className="btn btn-modal" onClick={this.closeModal}>Blast Off!</button>
              </Link>
              <Link to="/play">
                <button type="button" className="btn btn-modal" onClick={this.closeModal}>Not Yet</button>
              </Link>
            </div>
          </div>
        </Popup>
      </div>
    )
  }
}

export default Victory
