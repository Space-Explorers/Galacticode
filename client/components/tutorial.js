import React from 'react'

const Tutorial = props => {
  return (
    <div className="main-wrapper">
      <div>
        <h2>How to Play</h2>
        <button
          className="btn btn-close"
          onClick={() => props.history.goBack()}
        >
          Back
        </button>
      </div>
      <p>Instructions go here</p>
      <p>GIF or screenshot of example?</p>
    </div>
  )
}

export default Tutorial
