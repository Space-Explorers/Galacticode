import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getPlanetChallenges} from '../store'
import gamePlayEnvironment from './threejs/gameplay';
import ChallengeList from './challengeList'

class Game extends Component {
  componentDidMount() {
    this.props.fetchPlanetChallenges(this.props.match.params.planetId)
  }

  render() {
    const {challenges} = this.props
    return (
      <div>{gamePlayEnvironment()}
        <div>
          <ChallengeList challenges={challenges} />
        </div>
        <div className="button-wrapper">
          <button
            className="btn btn-close-challenge"
            type="submit"
          >
            Challenge List
          </button>
        </div>
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
