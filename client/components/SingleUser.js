import React from 'react'
import {connect} from 'react-redux'
//import {fetchAllUsers} from '../store/allUsers'
import {getSingleUser} from '../store/singleUser'
export class SingleUser extends React.Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.userId)
    console.log('this.props', this.props)
  }

  render() {
    const eachUser = this.props.eachUser
    return this.props.singleUser ? (
      <div>
        <h2>User:</h2>
        <div>{this.props.singleUser.email}</div>
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
