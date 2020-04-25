import React from 'react'
import {deleteUserThunk} from '../store/allUsers'
import {connect} from 'react-redux'

export class DeleteUser extends React.Component {
  render() {
    console.log(this.props, 'props on delete user')
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
  console.log('are we mapping the dispatch')
  return {deleteUser: id => dispatch(deleteUserThunk(id))}
}

export default connect(null, mapDispatch)(DeleteUser)
