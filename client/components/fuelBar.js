import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProgressData} from '../store'

class FuelBar extends Component {
  // componentDidMount() {
  //   this.props.fetchProgress(this.props.userId)
  // }

  render() {
    return (
      <div>
        <progress value={this.props.progress || 0} max="100" />
        <p>{this.props.progress || 0}/100</p>
      </div>
    )
  }
}

const mapState = state => ({
  progress: state.progress
  // userId: state.user.id
})

// const mapDispatch = dispatch => ({
//   fetchProgress: userId => dispatch(getProgressData(userId))
// })

export default connect(mapState, null)(FuelBar)
