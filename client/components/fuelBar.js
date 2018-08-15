import React from 'react'
import {connect} from 'react-redux'

const FuelBar = props => {
  return (
    <div>
      <progress value={props.progress || 70} max="100" />
    </div>
  )
}

const mapState = state => ({
  progress: state.progress
})

export default connect(mapState, null)(FuelBar)
