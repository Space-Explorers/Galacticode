import React, {Component} from 'react'
import {
  getResults,
  getChallengeData,
  getIsChallengeSolved,
  getProgressData
} from '../store'
import {connect} from 'react-redux'
import {Editor, Results} from './index'

class Challenge extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
      examples: '',
      showOutput: false,
      loading: false
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
    this.setState({
      showOutput: true,
      loading: true
    })
    await this.props.fetchResults(
      this.state.value,
      this.props.match.params.challengeId
    )
    await this.props.fetchProgress(this.props.user.id)
    this.setState({loading: false})
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
          <div>
            <h1>{name}</h1>
            <p>
              {skillLevel}, {points} Fuel Points
            </p>
          </div>
          <button
            className="btn btn-close"
            onClick={() => this.props.history.push('/play')}
          >
            Close
          </button>
        </div>

        <div className="content-wrapper">
          <div className="prompt">
            <div id="prompt-toggle">
              <h3
                onClick={() => this.setState({showOutput: false})}
                className={
                  this.state.showOutput
                    ? 'toggle-item'
                    : 'toggle-item active-toggle'
                }
              >
                Instructions
              </h3>
              <h3
                onClick={() => this.setState({showOutput: true})}
                className={
                  this.state.showOutput
                    ? 'toggle-item active-toggle'
                    : 'toggle-item'
                }
              >
                Output
              </h3>
            </div>
            {!this.state.showOutput ? (
              <div className="prompt">
                <p>{prompt}</p>
                <h3>Examples: </h3>
                <div className="examples-editor">
                  <Editor
                    value={this.state.examples}
                    readOnly={true}
                    maxLines={10}
                    showLineNumbers={false}
                  />
                </div>
                <br />
                {isChallengeSolved && (
                  <h3>You've Already Solved This Problem!</h3>
                )}
              </div>
            ) : (
              <Results results={results} loading={this.state.loading} />
            )}
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
        <div className="submit-button">
          <button
            className="btn btn-submit"
            type="submit"
            onClick={this.handleSubmit}
          >
            RUN
          </button>
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
  isChallengeSolved: state.solvedChallenges.challengeStatus
})

const mapDispatch = dispatch => ({
  fetchResults: (code, challengeId) => dispatch(getResults(code, challengeId)),
  fetchInitialData: challengeId => dispatch(getChallengeData(challengeId)),
  fetchIsChallengeSolved: (userId, challengeId) =>
    dispatch(getIsChallengeSolved(userId, challengeId)),
  fetchProgress: userId => dispatch(getProgressData(userId))
})

export default connect(mapState, mapDispatch)(Challenge)
