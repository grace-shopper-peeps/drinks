import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store/user'

const Navbar = (props, {handleClick, isLoggedIn}) => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">
        <img
          src="data:image/jpeg;base64,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"
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt="logo-image"
        />
        CJS
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
