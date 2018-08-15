import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <nav>
    {isLoggedIn && (
      <ul id="navbar">
        <li>
          <Link to="/">SPACE EXPLORERS: CODE HOME</Link>
        </li>
        <li>
          <p>**Fuel progress bar**</p>
        </li>
        <li className="dropdown">
          <Link to="/account">Account</Link>
          <ul className="dropdown-content">
            <li>
              <Link to="/tutorial">Tutorial</Link>
            </li>
            <li>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </li>
          </ul>
        </li>
      </ul>
    )}
  </nav>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
