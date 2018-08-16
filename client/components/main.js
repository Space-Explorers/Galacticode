import React from 'react'

const Main = () => {
  return (
    <div className="main-wrapper">
      <h1>Space Explorers: Code Home</h1>
      <div>
        <p>
          Our friendly alien is lost in space and needs your help! Explore new
          planets to unlock JavaScript challenges, earning fuel to travel to new
          planets and find your way home.
        </p>
        <a href="/auth/google">
          <img src="btn_google_signin_light_normal_web.png" />
        </a>
        <br />
        <a href="/auth/github">Login with Github</a>
      </div>
    </div>
  )
}

export default Main
