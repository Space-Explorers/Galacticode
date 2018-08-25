import React from 'react'
import {Link} from 'react-router-dom'

const ChallengeList = props => {
  const {challenges} = props
  return (
    <div className="list-wrapper">
      <div>
        <h1 id="list-header">
          SELECT A<br /> CHALLENGE
        </h1>
        <br />
        <Link to="/">
          <button className="btn btn-planet-select">Planet Select</button>
        </Link>
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
