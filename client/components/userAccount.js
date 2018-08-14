import React from 'react'
import {connect} from 'react-redux'


const UserAccount = (props) => {
  const {user} = props
  if (user.id){
    return(
      <div>
        <h1>User: {user.email}</h1>
        <h2>Progress: </h2>
        <h2>Current Planet: Gallifrey</h2>
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
