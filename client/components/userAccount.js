import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const UserAccount = props => {
  const {user} = props
  if (user.id) {
    return (
      <div>
        <Link to="/tutorial">Tutorial</Link>
        <h2>User: {user.email}</h2>
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
