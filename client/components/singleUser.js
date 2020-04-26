import React from 'react'
import {connect} from 'react-redux'
//import {fetchAllUsers} from '../store/allUsers'
import {getSingleUser} from '../store/singleUser'
export class SingleUser extends React.Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.userId)
  }

  render() {
    if (this.props.singleUser[0]) {
      console.log('this.props in single user', this.props.singleUser[0].id)
    }

    return this.props.singleUser ? (
      <div>
        <h2>User:</h2>
        <h3>{this.props.singleUser.id}</h3>
        <div>{this.props.singleUser.email}</div>
        <h2>Admin:</h2>
        {/* get isAdmin to render */}
        <p>{this.props.singleUser.isAdmin}</p>
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
  getUser: id => dispatch(getSingleUser(id))
})

export default connect(mapState, mapDispatch)(SingleUser)
