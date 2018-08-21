import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => (
    <div className="planet-select">
      <div className="planet-header">
        <h2>SELECT A PLANET!</h2>
      </div>
      <div className="planet1">
        <Link to="/play">
          <img
            className="planet-img"
            src="https://cdn.iconscout.com/public/images/icon/premium/png-512/icosahedron-shapes-3060f4044e2d0bc7-512x512.png"
            width="150"
            height="150"
          />
        </Link>
      </div>
      <div className="planet2">
        <Link to="/play">
          <img
            className="planet-img"
            src="https://cdn.iconscout.com/public/images/icon/premium/png-512/icosahedron-shapes-3060f4044e2d0bc7-512x512.png"
            width="150"
            height="150"
          />
        </Link>
      </div>
      <div className="planet3">
        <Link to="/play">
          <img
            className="planet-img"
            src="https://cdn.iconscout.com/public/images/icon/premium/png-512/icosahedron-shapes-3060f4044e2d0bc7-512x512.png"
            width="150"
            height="150"
          />
        </Link>
      </div>
    </div>
)

export default Home
