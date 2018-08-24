import React from 'react'
import {Link} from 'react-router-dom'

const ChallengeList = (props) => {
  const {challenges} = props
  return (
    <div className="list-wrapper">
    <div>
      <h1 id="list-header">
        SELECT A<br /> CHALLENGE
      </h1>
      <br />
      <button
        onClick={() => this.props.history.goBack()}
        className="btn btn-close"
      >
        Close
      </button>
    </div>
    {challenges &&
      challenges.map(challenge => (
        <Link
          to={`/challenge/${challenge.id}`}
          key={challenge.id}
          className="list-hover"
        >
          {challenge.name}
          <p>{challenge.skillLevel}</p>
        </Link>
      ))}
    </div>
  )
}

export default ChallengeList
