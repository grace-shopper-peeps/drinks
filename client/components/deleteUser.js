import React from 'react'
import {deleteUserThunk} from '../store/allUsers'
import {connect} from 'react-redux'

export class DeleteUser extends React.Component {
  render() {
    return (
      <button
        type="button"
        onClick={() => {
          this.props.deleteUser(this.props.eachUser.id)
        }}
      >
        Delete User
      </button>
    )
  }
}

const mapDispatch = dispatch => {
  return {deleteUser: id => dispatch(deleteUserThunk(id))}
}

export default connect(null, mapDispatch)(DeleteUser)
