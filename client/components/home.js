import React from 'react'
import {Link} from 'react-router-dom'
import planetBackground from './script'

const Home = () => (
  <div>
    {planetBackground()}
    <div className="main-wrapper">
      <p>** Planet Select game screen goes here **</p>
      <Link to="/play">Start Planet One</Link>
    </div>
  </div>
)

export default Home
