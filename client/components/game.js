import React from 'react'
import {Link} from 'react-router-dom'

const Game = () => (
  <div className="main-wrapper">
    <p>** Gameplay goes here **</p>
    <Link to="/challenge/1">Challenge #1</Link>
    <Link to="/challenge/2">Challenge #2</Link>
    <Link to="/challenge/3">Challenge #3</Link>
    <Link to="/challenge/4">Challenge #4</Link>
    <Link to="/challenge/5">Challenge #5</Link>
    <Link to="/">Back to Planet Select</Link>
  </div>
)

export default Game
