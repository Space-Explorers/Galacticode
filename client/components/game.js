import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getPlanetChallenges} from '../store'
import ChallengeList from './challengeList'
import {planetGame} from './threejs/threedGame'

class Game extends Component {
  constructor(){
    super()
    this.state = {
      showOutput: true
    }
  }
  componentDidMount() {
    this.props.fetchPlanetChallenges(this.props.match.params.planetId)
  }

  render() {
    const {challenges} = this.props
    return (
      <div>
        <div>
         {planetGame()}
        </div>
      {!this.state.showOutput ? (
        <div className="button-wrapper">
        <button
          onClick={() => this.setState({showOutput: false})}
          className="btn btn-close-challenge"
          type="submit"
        >
          Challenge List
        </button>
      </div>) : (

        <div className="list-wrapper">
            <div>
              <h1 id="list-header">
                SELECT A<br /> CHALLENGE
              </h1>
              <br />
              <button
                onClick={() => this.setState({showOutput: true})}
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
      )}
      </div>
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
