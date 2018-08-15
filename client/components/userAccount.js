import React from 'react'
import {connect} from 'react-redux'

const UserAccount = props => {
  const {user} = props
  if (user.id) {
    return (
      <div className="main-wrapper">
        <div>
          <h2>User: {user.email}</h2>
          <button
            className="btn btn-close"
            onClick={() => props.history.goBack()}
          >
            Back
          </button>
        </div>
        <h3>Progress: </h3>
        <h3>Current Planet: Gallifrey</h3>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserAccount)
