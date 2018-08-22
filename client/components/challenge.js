import React, { Component } from 'react'
import {
  getResults,
  getChallengeData,
  getIsChallengeSolved,
  getProgressData
} from '../store'
import { connect } from 'react-redux'
import Editor from './editor'

class Challenge extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
      examples: ''
    }
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchInitialData(this.props.match.params.challengeId)
    await this.props.fetchIsChallengeSolved(
      this.props.user.id,
      this.props.match.params.challengeId
    )
    await this.setState({
      value: this.props.startingText,
      examples: this.props.examples
    })
  }

  async handleSubmit() {
    await this.props.fetchResults(
      this.state.value,
      this.props.match.params.challengeId
    )
    await this.props.fetchProgress(this.props.user.id)
  }

  onChange(newValue) {
    this.setState({
      value: newValue
    })
  }

  render() {
    const {
      name,
      prompt,
      results,
      skillLevel,
      points,
      isChallengeSolved
    } = this.props
    return (
      <div className="main-wrapper">
        <div className="challenge-header">
          <h1>{name}</h1>
          <button
            className="btn btn-close"
            onClick={() => this.props.history.push('/play')}
          >
            Close
          </button>
        </div>
        <div>
          <p>
            {skillLevel}, {points} Fuel Points
          </p>
        </div>
        {isChallengeSolved && <h3>You've Already Solved This Problem!</h3>}
        <div className="content-wrapper">
          <div className="prompt">
            <p>{prompt}</p>
            <h3>Examples: </h3>
            <div className="results">
              {/* {results.stats.passPercent === 100 && (
                  <p>Congratulations! All tests passed!</p>
                )} */}
              {results && (
                <div>
                  <p>Tests Run: {results.stats.tests}</p>
                  <p>Tests Passed: {results.stats.passes}</p>
                  <p>Tests Failed: {results.stats.failures}</p>
                </div>
              )}
            </div>
            <div className="examples-editor">
              <Editor
                value={this.state.examples}
                readOnly={true}
                maxLines={10}
                showLineNumbers={false}
              />
            </div>
            <div className="submit-button">
              <button
                className="btn btn-submit"
                type="submit"
                onClick={this.handleSubmit}
              >
                SUBMIT
              </button>
            </div>
          </div>
          <div className="editor">
            <Editor
              onChange={this.onChange}
              value={this.state.value}
              readOnly={false}
              showLineNumbers={true}
            />
          </div>
        </div>
      </div>
    )
  }
}
const mapState = state => ({
  user: state.user,
  results: state.results.results,
  name: state.challenge.name,
  prompt: state.challenge.prompt,
  skillLevel: state.challenge.skillLevel,
  points: state.challenge.points,
  examples: state.challenge.examples,
  startingText: state.challenge.startingText,
  isChallengeSolved: state.results.challengeStatus
})

const mapDispatch = dispatch => ({
  fetchResults: (code, challengeId) => dispatch(getResults(code, challengeId)),
  fetchInitialData: challengeId => dispatch(getChallengeData(challengeId)),
  fetchIsChallengeSolved: (userId, challengeId) =>
    dispatch(getIsChallengeSolved(userId, challengeId)),
  fetchProgress: userId => dispatch(getProgressData(userId))
})

export default connect(mapState, mapDispatch)(Challenge)


