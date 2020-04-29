import React from 'react'
import {connect} from 'react-redux'
//import {fetchAllUsers} from '../store/allUsers'
import {getSingleUser, updateSingleUser} from '../store/singleUser'
export class SingleUser extends React.Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.userId)
  }

  render() {
    return this.props.singleUser ? (
      <div>
        <h2>User:</h2>
        <h3>{this.props.singleUser.id}</h3>
        <div>{this.props.singleUser.email}</div>
        <h2>Admin:</h2>
        {/* get isAdmin to render */}
        <p>{this.props.singleUser.isAdmin ? 'true' : 'false'}</p>
        <button type="button">Upgrade user To Admin</button>
      </div>
    ) : (
      <div>loading</div>
    )
  }
}

const mapState = state => {
  return {
    wantedUser: state.users,
    singleUser: state.selectedUser
  }
}

const mapDispatch = dispatch => ({
  getUser: id => dispatch(getSingleUser(id)),
  updateUser: (id, user) => dispatch(updateSingleUser(id, user))
})

export default connect(mapState, mapDispatch)(SingleUser)
// onClick={this.props.updateUser(this.props.singleUser.id, this.props.singleUser)}
