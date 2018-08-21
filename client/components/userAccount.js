import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getSolvedData} from '../store'
import {Editor} from './index'

class UserAccount extends Component {
  constructor() {
    super()
    this.state = {
      selectedSolution: ''
    }
  }
  componentDidMount() {
    this.props.fetchCompletedChallenges(this.props.user.id)
  }

  render() {
    const {user, completedChallenges, progress} = this.props
    if (user.id) {
      return (
        <div className="main-wrapper">
          <div className="challenge-header">
            <div>
              <h2>Player Name: {user.name || user.email}</h2>
              <h2>Total Fuel Points: {progress}</h2>
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
            <h3>Current Planet</h3>
            <div>
              <p>INSERT FURTHEST PLANET HERE</p>
            </div>
          </div>
          <div>
            <Editor value={this.state.selectedSolution} />
          </div>
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    user: state.user,
    completedChallenges: state.solvedChallenges.completedChallenges,
    progress: state.progress
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCompletedChallenges: id => dispatch(getSolvedData(id))
  }
}

export default connect(mapState, mapDispatch)(UserAccount)
