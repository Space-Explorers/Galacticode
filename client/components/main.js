import React from 'react'

const Main = () => {
  return (
    <div className="editor-wrapper">
      <h1>Code Home</h1>
      <div>
        <img
          src="https://media.giphy.com/media/gHcPh3ehbRGik/giphy.gif"
          alt="Happy ET"
        />
        <p>
          Our friend ET was kidnapped by an evil alien villain! In an attempt to
          escape from the evil, ET got lost in space. Practice your JavaScript
          skills and level up to help him find fuel for his spaceship so he can
          return home to Elliott and Gertie!
        </p>
        <a href="/auth/google">Login with Google</a>
        <br />
        <a href="/auth/github">Login with Github</a>
      </div>
    </div>
  )
}

export default Main
