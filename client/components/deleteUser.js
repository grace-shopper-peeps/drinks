import React from 'react'
import deleteUserThunk from '../store/allUsers'
import {connect} from 'react-redux'

export class DeleteUser extends React.Component {
  render() {
    console.log(this.props)
    return (
      <button
        type="submit"
        onClick={() => {
          this.props.deleteUser(this.props.eachUser.id)
        }}
      >
        Delete User
      </button>
    )
  }
}

const mapDispatch = dispatch => ({
  deleteUser: id => dispatch(deleteUserThunk(id))
})

export default connect(null, mapDispatch)(DeleteUser)
