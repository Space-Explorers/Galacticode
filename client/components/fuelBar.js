import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProgressData} from '../store'
import {Victory} from './index'

class FuelBar extends Component {
  componentDidMount() {
    this.props.fetchProgress(this.props.userId)
  }

  render() {
    const {progress} = this.props
    return (
      <div>
        <progress value={progress || 0} max="100" />
        <p>{progress || 0}/100</p>
        {progress === 100 && <Victory />}
      </div>
    )
  }
}

const mapState = state => ({
  progress: state.progress,
  userId: state.user.id
})

const mapDispatch = dispatch => ({
  fetchProgress: userId => dispatch(getProgressData(userId))
})

export default connect(mapState, mapDispatch)(FuelBar)
