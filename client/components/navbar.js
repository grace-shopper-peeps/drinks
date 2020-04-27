import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => {
  return (
    <Container>
      <Row>
        <Col>
          <h1 id="top">Quarantini</h1>
        </Col>
        <Col>
          <nav id="nav-bar">
            {isLoggedIn ? (
              <div>
                {/* The navbar will show these links after you log in */}
                <Link className="link" to="/home">
                  Home
                </Link>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Link className="link" to="/login">
                  Login
                </Link>
                <Link to="/signup">Sign Up</Link>
              </div>
            )}
            <Link className="link" to="/products">
              All Products
            </Link>
            <Link className="link" to="/cart">
              Cart
            </Link>
            <Link className="link" to="/orders">
              All Orders
            </Link>
            <Link className="link" to="/users">
              All User
            </Link>
          </nav>
        </Col>
        <hr />
      </Row>
    </Container>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
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
