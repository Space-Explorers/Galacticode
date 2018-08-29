import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPlanetChallenges } from '../store'
import ChallengeList from './challengeList'
import gamePlayEnvironment from './threejs/gameplay';

class Game extends Component {
  constructor() {
    super()
    this.state = {
      showList: false
    }
    this.toggleList = this.toggleList.bind(this)
  }
  componentDidMount() {
    this.props.fetchPlanetChallenges(this.props.match.params.planetId)
  }

  toggleList() {
    const currentStatus = this.state.showList
    this.setState({ showList: !currentStatus })
  }

  render() {

    // Figure out how to prevent this from being created in the first place
    const background = document.getElementById('background')
    const stars = document.getElementById('stars')
    document.body.removeChild(background)
    document.body.removeChild(stars)

    const { challenges } = this.props
    return (
      <div>
        <div>{gamePlayEnvironment()}</div>
        {this.state.showList && (
          <ChallengeList challenges={challenges} toggleList={this.toggleList} />
        )}
        <div className="button-wrapper">
          <button
            onClick={this.toggleList}
            className="btn btn-close-challenge"
            type="submit"
          >
            {this.state.showList ? 'Return to Game' : 'View As List'}
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
