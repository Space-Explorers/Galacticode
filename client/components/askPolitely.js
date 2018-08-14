import React, {Component} from 'react'
import {getResults} from '../store'
import {connect} from 'react-redux'
import Editor from './editor'

class AskPolitely extends Component {
  constructor() {
    super()
    this.state = {value: ''}

    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchInitialData()
  }

  handleSubmit = () => {
    this.props.fetchResults(this.state.value, 1, this.props.user.id)
    console.log('value:', typeof this.state.value)
  }

  onChange(newValue) {
    this.setState({
      value: newValue
    })
    // console.log(this.state.value)
  }

  render() {
    return (
      <div>
        <h1>Ask Politely</h1>
        <div>
          <div>
            <p>{this.props.prompt}</p>
            <p>{this.props.examples}</p>
            <div id="results">
              {this.props.results && (
                <div>
                  <p>Tests Run: {this.props.results.stats.tests}</p>
                  <p>Tests Passed: {this.props.results.stats.passes}</p>
                  <p>Tests Failed: {this.props.results.stats.failures}</p>
                </div>
              )}
            </div>
          </div>
          <div>
            <Editor onChange={this.onChange} value={this.state.value} />
          </div>
        </div>
        <div>
          <button type="submit" onClick={this.handleSubmit}>
            SUBMIT
          </button>
        </div>
      </div>
    )
  }
}
const mapState = state => ({
  user: state.user,
  results: state.results,
  prompt: state.challenge.prompt,
  examples: state.challenge.examples
})

const mapDispatch = dispatch => ({
  fetchResults: (code, problemId, userId) =>
    dispatch(getResults(code, problemId, userId)),
  fetchInitialData: () => dispatch(getChallenge())
})

export default connect(mapState, mapDispatch)(AskPolitely)
