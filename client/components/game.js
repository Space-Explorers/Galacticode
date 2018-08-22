import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPlanetChallenges } from '../store'
import gamePlayEnvironment from './threejs/gameplay';

class Game extends Component {
  componentDidMount() {
    this.props.fetchPlanetChallenges(this.props.match.params.planetId)
  }

  render() {
    const { challenges } = this.props
    return (
      <div>{/* {gamePlayEnvironment()} */}</div>
      // <div className="list-wrapper">
      //   <div>
      //     <h1 id="list-header">
      //       SELECT A<br /> CHALLENGE
      //     </h1>
      //     <br />
      //     <button
      //       onClick={() => this.props.history.push('planet/1')}
      //       className="btn btn-close"
      //     >
      //       Back
      //     </button>
      //   </div>
      //   {challenges &&
      //     challenges.map(challenge => (
      //       <Link
      //         to={`/challenge/${challenge.id}`}
      //         key={challenge.id}
      //         className="list-hover"
      //       >
      //         {challenge.name}
      //         <p>{challenge.skillLevel}</p>
      //       </Link>
      //     ))}
      // </div>
    )
  }
}

const mapStateToProps = state => ({
  challenges: state.planets.planetChallenges
})

const mapDispatchToProps = dispatch => ({
  fetchPlanetChallenges: planetId => dispatch(getPlanetChallenges(planetId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)
