import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getSolvedData} from '../store'

class UserAccount extends Component {
  componentDidMount() {
    this.props.fetchCompletedChallenges(this.props.user.id)
  }

  render() {
    const {user, completedChallenges} = this.props
    console.log('COMP', completedChallenges)
    if (user.id) {
      return (
        <div className="main-wrapper">
          <div className="challenge-header">
            <h2>Player Name: {user.name || user.email}</h2>
            <button
              className="btn btn-close"
              onClick={() => props.history.goBack()}
            >
              Back
            </button>
          </div>
          <div id="user-challenges">
            <h3>Completed Challenges</h3>
            {completedChallenges && completedChallenges[0] ? (
              completedChallenges.map(chall => (
                <Link key={chall.id} to={`/challenge/${chall.id}`}>
                  {chall.id}
                </Link>
              ))
            ) : (
              <p>You haven't solved any challenges yet. Get coding!</p>
            )}
            {/* <p>map solved challenges</p> */}
            }
          </div>
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    user: state.user,
    completedChallenges: state.solvedChallenges.completedChallenges
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCompletedChallenges: id => dispatch(getSolvedData(id))
  }
}

export default connect(mapState, mapDispatch)(UserAccount)
