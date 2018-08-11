import React, {Component} from 'react'
import {}
import {connect} from 'react-redux'


class AskPolitely extends Component{
  constructor (){
    super ()
    this.state = {}
  }
  render(){
    return(
      <div>
        <p>Create the function askPolitely that accepts a sentence as an argument.If the last character of the sentence is a question mark, then make sure the question ends with the word "please?". <br />
        If a question is already polite(meaning it already ends with "please") or the sentence is not a question, then return the inputted string without modification.
        <br />
        Examples:
          - INPUT: askPolitely("May I borrow your pencil?");
          - OUTPUT: "May I borrow your pencil please?"
        <br />
          - INPUT: askPolitely("May I ask a question please?");
          - OUTPUT: "May I ask a question please?<br />

          - INPUT: askPolitely("My name is Grace Hopper.");
          - OUTPUT: "My name is Grace Hopper.";
        </p>

        <button type ='submit'>SUBMIT</button>
      </div>

    )
  }


}

const mapDispatch = dispatch => ({
  fetchResults: (code, problemId, userId) => dispatch(getResults(code, problemId, userId))
})


export default connect()(AskPolitely)
