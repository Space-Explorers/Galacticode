import React, {Component} from 'react'
import {getResults, getChallengeData, getIsChallengeSolved} from '../store'
import {connect} from 'react-redux'
import Editor from './editor'

class Challenge extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    console.log('COMPONENT MOUNTED')
    this.props.fetchInitialData(this.props.match.params.challengeId)
    this.props.fetchIsChallengeSolved(
      this.props.user.id,
      this.props.match.params.challengeId
    )
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextState.value !== this.state.value){
      return false
    }else{
      return true
    }
  }

  handleSubmit() {
    this.props.fetchResults(
      this.state.value,
      this.props.match.params.challengeId,
      this.props.user.id,
      this.props.points
    )
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
      examples,
      results,
      skillLevel,
      points,
      isChallengeSolved
    } = this.props
    console.log('USER', this.props)
    console.log('CURRENT STATE', this.state)
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
            {examples && (
              <div>
                {examples.map(example => (
                  <div key={example.id}>
                    <p>INPUT: {example.input}</p>
                    <p>OUTPUT: {example.output}</p>
                  </div>
                ))}
              </div>
            )}
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
            <Editor onChange={this.onChange} value={this.state.value} />
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
  isChallengeSolved: state.results.challengeStatus
})

const mapDispatch = dispatch => ({
  fetchResults: (code, challengeId, userId, points, userProgress) =>
    dispatch(getResults(code, challengeId, userId, points, userProgress)),
  fetchInitialData: challengeId => dispatch(getChallengeData(challengeId)),
  fetchIsChallengeSolved: (userId, challengeId) =>
    dispatch(getIsChallengeSolved(userId, challengeId))
})

export default connect(mapState, mapDispatch)(Challenge)
