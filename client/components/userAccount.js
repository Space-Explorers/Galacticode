import React from 'react'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'

//thunks
// import {me} from '../store/user'

//progress bar, current planet, problems solved

// class UserAccount extends Component{
//   constructor(){
//     super()
//     this.state = {}
//     console.log("user", this.props)

//   }


  // componentDidMount(){
  //   this.props.getUser()
  //   // this.props.getSolved()
  //   // this.props.getProgress()
  // }

const UserAccount = ({user}) => (
  <div>
    <h1>User: {user.email}</h1>
    <h2>Progress: {user.progress}</h2>
    <h2>Current Planet</h2>
  </div>
)

const mapState = state => {
  return {
    user: state.user
  }
}

// const mapDispatch = dispatch => ({
//   getUser:() => dispatch(me())
// })

export default connect(mapState)(UserAccount)
