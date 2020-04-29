import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store/user'

const Navbar = (props, {handleClick, isLoggedIn}) => {
  console.log(props, 'props on navbar')
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">
        <h2>Quarantini</h2>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        {isLoggedIn ? (
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="/">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="#" onClick={handleClick}>
                Logout
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/products">
                Products
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/cart">
                Cart
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/orders">
                All Orders
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/users">
                All Users
              </a>
            </li>
          </ul>
        ) : (
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="/">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>

            <li class="nav-item active">
              <a class="nav-link" href="/login">
                Login
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/signup">
                Sign Up
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/products">
                Products
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/cart">
                Cart
              </a>
            </li>
            {props.user && props.user.isAdmin ? (
              <li class="nav-item active">
                <a class="nav-link" href="/orders">
                  All Orders
                </a>
              </li>
            ) : (
              ''
            )}
            {props.user && props.user.isAdmin ? (
              <li class="nav-item active">
                <a class="nav-link" href="/users">
                  All Users
                </a>
              </li>
            ) : (
              ''
            )}
            <li class="nav-item active">
              <a class="nav-link" href={`/users/myProfile/${props.user.id}`}>
                My Profile
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/#" onClick={handleClick}>
                Logout
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
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
