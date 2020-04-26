import React from 'react'
import {connect} from 'react-redux'
//import {fetchAllUsers} from '../store/allUsers'
import {getSingleUser} from '../store/singleUser'
export class SingleUser extends React.Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.userId)
    console.log('this.props', this.props.singleUser)
  }

  render() {
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
