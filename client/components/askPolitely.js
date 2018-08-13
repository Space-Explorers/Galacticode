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
    console.log('RESULTS', this.props.results)
    return (
      <div>
        <h1>Ask Politely</h1>
        <div id='main-container'>
          <div id='prompt'>
            <div>
              Create the function askPolitely that accepts a sentence as an
              argument.If the last character of the sentence is a question mark,
              then make sure the question ends with the word "please?". <br />
              If a question is already polite(meaning it already ends with
              "please") or the sentence is not a question, then return the
              inputted string without modification.
            </div>
            <div>
              Examples:
            </div>
            <div>
              <table>

                <thead>
                  <tr>
                    <th>Input</th>
                    <th>Expected Output</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>askPolitely("May I borrow your pencil?")</td>
                    <td>"May I borrow your pencil please?"</td>
                  </tr>
                  <tr>
                    <td>askPolitely("May I ask a question please?")</td>
                    <td>"May I ask a question please?"</td>
                  </tr>
                  <tr>
                    <td>askPolitely("My name is Grace Hopper.")</td>
                    <td>"My name is Grace Hopper."</td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
          <div id="inputResults">
            <div id="editor">
              <Editor onChange={this.onChange} value={this.state.value} />
            </div>
            <div id="results">
              {
                this.props.results &&
                <div>
                  <table>
                    {
                      this.props.results.tests.map(test => (
                        <tr>

                        </tr>
                      ))
                    }
                  </table>
                  <p>{this.props.results.stats.tests}</p>
                </div>
              }
            </div>
          </div>
          <div>
            <button type="submit" onClick={this.handleSubmit}>
              SUBMIT
            </button>
          </div>
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
