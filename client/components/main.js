import React from 'react'
import planetBackground from './script'

const Main = () => {
  return (
    <div>
      {planetBackground()}
      <div className="outer-flex">
        <div className="main-wrapper">
          <h1 id="intro-header">Space Explorers: Code Home</h1>
          <div>
            <p id="intro">
              Our friendly alien is lost in space and needs your help! Explore
              new planets to unlock JavaScript challenges, earning fuel to
              travel to new planets and find your way home.
            </p>
            <div id="login-buttons">
              <a href="/auth/google">
                {/* <img src="btn_google_signin_light_normal_web.png" /> */}
                Login with Google
              </a>
              <br />
              <a href="/auth/github">Login with Github</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
