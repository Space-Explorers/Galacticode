import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getSolvedData, getUnlockedPlanets} from '../store'
import {Editor} from './index'

class UserAccount extends Component {
  constructor() {
    super()
    this.state = {
      selectedSolution: ''
    }
  }
  async componentDidMount() {
    await this.props.fetchCompletedChallenges(this.props.user.id)
    await this.props.fetchUnlockedPlanets(this.props.user.id)
  }

  render() {
    const {user, completedChallenges, progress, currentPlanet} = this.props
    if (user.id) {
      return (
        <div className="account-wrapper">
          <div className="challenge-header">
            <div>
              <h2>PLAYER: {user.name || user.email}</h2>
              <h2>TOTAL FUEL: {progress || 0}</h2>
            </div>
            <button
              className="btn btn-close"
              onClick={() => this.props.history.goBack()}
            >
              Back
            </button>
          </div>
          <div id="user-challenges">
            <h3>Completed Challenges</h3>
            {completedChallenges && completedChallenges[0] ? (
              completedChallenges.map(chall => (
                <div key={chall.id}>
                  <p>
                    <Link to={`/challenge/${chall.id}`}>{chall.name}</Link>
                    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                    <a
                      onClick={() =>
                        this.setState({selectedSolution: chall.solution})
                      }
                    >
                      View Solution
                    </a>
                  </p>
                </div>
              ))
            ) : (
              <p>You haven't solved any challenges yet. Get coding!</p>
            )}
          </div>
          <Editor
            value={this.state.selectedSolution}
            readOnly={true}
            showLineNumbers={false}
            showGutter={false}
            height="150px"
          />
          <div id="user-planet">
            <h3>Currently on Planet {currentPlanet.name}</h3>
            <div>
              <img width="150" height="150" src={currentPlanet.img} />
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapState = state => {
  let furthestPlanet = {}
  if (state.planets.unlockedPlanets) {
    const userPlanets = state.planets.unlockedPlanets
    const planetIds = userPlanets.map(planet => planet.id)
    const maxPlanetId = Math.max(planetIds)
    furthestPlanet = userPlanets.find(planet => planet.id === maxPlanetId)
  }

  return {
    user: state.user,
    completedChallenges: state.solvedChallenges.completedChallenges,
    progress: state.progress,
    currentPlanet: furthestPlanet
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCompletedChallenges: id => dispatch(getSolvedData(id)),
    fetchUnlockedPlanets: id => dispatch(getUnlockedPlanets(id))
  }
}

export default connect(mapState, mapDispatch)(UserAccount)
