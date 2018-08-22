import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getPlanetChallenges} from '../store'

class Game extends Component {
  componentDidMount () {
    this.props.fetchPlanetChallenges(this.props.match.params.planetId)
  }

  render () {
    const { planet } = this.props
    return (
      <div className="main-wrapper">
        <h2>SELECT A CHALLENGE!</h2>
        <div>
          {planet && (
            planet.challenges.map(challenge => (
              <div key={challenge.id}>
                <Link to={`/challenge/${challenge.id}`}>{challenge.name}</Link>
              </div>
          )))}
        </div>
        <div>
          <Link to="/">Back to Planet Select</Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  planet: state.planets.planet
})

const mapDispatchToProps = dispatch => ({
  fetchPlanetChallenges: planetId => dispatch(getPlanetChallenges(planetId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
