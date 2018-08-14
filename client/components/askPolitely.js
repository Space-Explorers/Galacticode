import React, { Component } from 'react'
import { getResults } from '../store'
import { connect } from 'react-redux'
import Editor from './editor'

class AskPolitely extends Component {
  constructor() {
    super()
    this.state = { value: '' }

    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
            <p>
              Create the function askPolitely that accepts a sentence as an
              argument.If the last character of the sentence is a question mark,
              then make sure the question ends with the word "please?". <br />
              If a question is already polite(meaning it already ends with
              "please") or the sentence is not a question, then return the
              inputted string without modification.
              <br />
              Examples: - INPUT: askPolitely("May I borrow your pencil?"); -
              OUTPUT: "May I borrow your pencil please?"
              <br />
              - INPUT: askPolitely("May I ask a question please?"); - OUTPUT:
              "May I ask a question please?<br />
              - INPUT: askPolitely("My name is Grace Hopper."); - OUTPUT: "My
              name is Grace Hopper.";
            </p>
            <div id="results">
              {
                this.props.results &&
                <div>
                  <p>Tests Run: {this.props.results.stats.tests}</p>
                  <p>Tests Passed: {this.props.results.stats.passes}</p>
                  <p>Tests Failed: {this.props.results.stats.failures}</p>
                </div>
              }
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
  results: state.results
})

const mapDispatch = dispatch => ({
  fetchResults: (code, problemId, userId) =>
    dispatch(getResults(code, problemId, userId))
})

export default connect(mapState, mapDispatch)(AskPolitely)
