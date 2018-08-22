import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProgressData} from '../store'
import {Victory} from './index'

const calculateProgress = progress => {
  if (progress === 0) return progress
  if (progress % 100 !== 0) {
    return progress % 100
  } else {
    return 100
  }
}

class FuelBar extends Component {
  componentDidMount() {
    this.props.fetchProgress(this.props.userId)
  }

  render() {
    const {progress} = this.props
    return (
      <div>
        <progress value={calculateProgress(progress)} max="100" />
        <p>{calculateProgress(progress)}/100</p>
        {calculateProgress(progress) === 100 && <Victory />}
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
