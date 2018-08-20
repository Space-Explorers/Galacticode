import React, {Component} from 'react'
import {
  getResults,
  getChallengeData,
  getIsChallengeSolved,
  getProgressData,
  setCurrentCode,
  getCurrentCode,
  removeChallengeData,
  removeResultsData
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
    const challengeId = this.props.match.params.challengeId
    await this.props.fetchInitialData(challengeId)
    await this.props.fetchIsChallengeSolved(this.props.user.id, challengeId)
    await this.props.fetchCurrCode()

    let value
    if (this.props.currentCode.challengeId === challengeId) {
      value = this.props.currentCode.code
    } else {
      value = this.props.startingText
    }
    await this.setState({
      value,
      examples: this.props.examples
    })
  }

  componentWillUnmount() {
    this.props.clearComponentData()
    this.props.clearResultsData()
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
    this.props.setCurrCode(this.props.match.params.challengeId, newValue)
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
              <b>Difficulty: </b>
              {skillLevel}&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;<b>
                Fuel Points:{' '}
              </b>
              {points}
            </p>
          </div>
          <button
            className="btn btn-close"
            onClick={() => this.props.history.push('/play')}
          >
            Close
          </button>
        </div>

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
            <div className="content">
              <p>{prompt}</p>
              <h3>Examples: </h3>
              <div className="examples-editor">
                <Editor
                  value={this.state.examples}
                  showGutter={false}
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
            <div className="content">
              <Results results={results} loading={this.state.loading} />
            </div>
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
        {!this.state.showOutput ? (
          <div className="content">
            <p>{prompt}</p>
            <h3>Examples: </h3>
            <div className="examples-editor">
              <Editor
                value={this.state.examples}
                showGutter={false}
                readOnly={true}
                maxLines={10}
                showLineNumbers={false}
              />
            </div>
            <br />
            {isChallengeSolved && <h3>You've Already Solved This Problem!</h3>}
          </div>
        ) : (
          <Results results={results} loading={this.state.loading} />
        )}

        <div className="editor">
          <Editor
            onChange={this.onChange}
            value={this.state.value}
            readOnly={false}
            showLineNumbers={true}
          />
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
  results: state.results,
  name: state.challenge.name,
  prompt: state.challenge.prompt,
  skillLevel: state.challenge.skillLevel,
  points: state.challenge.points,
  examples: state.challenge.examples,
  startingText: state.challenge.startingText,
  isChallengeSolved: state.solvedChallenges.challengeStatus,
  currentCode: state.currChallenge
})

const mapDispatch = dispatch => ({
  fetchResults: (code, challengeId) => dispatch(getResults(code, challengeId)),
  fetchInitialData: challengeId => dispatch(getChallengeData(challengeId)),
  fetchIsChallengeSolved: (userId, challengeId) =>
    dispatch(getIsChallengeSolved(userId, challengeId)),
  fetchProgress: userId => dispatch(getProgressData(userId)),
  setCurrCode: (challengeId, code) =>
    dispatch(setCurrentCode(challengeId, code)),
  fetchCurrCode: () => dispatch(getCurrentCode()),
  clearComponentData: () => dispatch(removeChallengeData()),
  clearResultsData: () => dispatch(removeResultsData())
})

export default connect(mapState, mapDispatch)(Challenge)
