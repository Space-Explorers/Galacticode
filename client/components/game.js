import React from 'react'
import {Link} from 'react-router-dom'
import {gameCoreDemo} from './game/game.core.demo'

const Game = () => (
  <div>
      {window.gameInstance = window.game.core()}
			{	window.gameInstance.init({
					domContainer: document.querySelector("#game"),
					rendererClearColor: window.game.static.white
				})
}
  {/* <div className="main-wrapper">
    <p>** Gameplay goes here **</p>
    <Link to="/challenge/1">Challenge #1 - Greeting</Link>
    <Link to="/challenge/2">Challenge #2 - Do You Play The Theremin?</Link>
    <Link to="/challenge/3">Challenge #3 - Repeat A String</Link>
    <Link to="/challenge/4">Challenge #4 - Vowel Count</Link>
    <Link to="/challenge/5">Challenge #5 - Ask Politely</Link>
    <Link to="/challenge/6">Challenge #6 - Last Digit</Link>
    <Link to="/challenge/7">Challenge #7 - Nickname Generator</Link>
    <Link to="/challenge/8">Challenge #8 - My Join</Link>
    <Link to="/challenge/9">Challenge #9 - Is Palindrome</Link>
    <br />
    <Link to="/">Back to Planet Select</Link>
  </div> */}
  </div>
)

export default Game
