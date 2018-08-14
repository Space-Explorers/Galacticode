import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
// import {LoginModal} from './index'
// import { Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'

const NavigationBar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>SPACE EXPLORERS: CODE HOME</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

// class NavigationBar extends Component {
//   constructor (props) {
//     super(props)
//   }

//   render () {
//     return (
//       <Navbar light expand="sm">
//         <NavbarBrand href="/">
//           <img
//             src="https://cdn.shopify.com/s/files/1/0878/5254/products/doctor-who-adipose-pop-alt_large.jpg?v=1528820139"
//             height="42"
//             width="42"
//           />
//         </NavbarBrand>
//         <Collapse isOpen={true} navbar>
//           {this.props.isLoggedIn ? (
//             <Nav className="ml-auto" navbar>
//               <NavItem>
//                 <NavLink href="/home">Home</NavLink>
//               </NavItem>
//               <NavItem>
//                 <div onClick={this.props.handleClick}>
//                   <NavLink href="#">Logout</NavLink>
//                 </div>
//               </NavItem>
//             </Nav>
//           ) : (
//             <Nav className="ml-auto" navbar>
//               <NavItem>
//                 <LoginModal display="Login" />
//               </NavItem>
//               <NavItem>
//                 <LoginModal display="Signup" />
//               </NavItem>
//             </Nav>
//           )}
//         </Collapse>
//       </Navbar>
//     )
//   }
// }

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

export default connect(mapState, mapDispatch)(NavigationBar)

/**
 * PROP TYPES
 */
NavigationBar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
