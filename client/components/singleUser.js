import React from 'react'
import {connect} from 'react-redux'
//import {fetchAllUsers} from '../store/allUsers'
import {getSingleUser, updateSingleUser} from '../store/singleUser'
export class SingleUser extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit() {
    const id = this.props.singleUser.id
    const user = this.props.singleUser
    this.props.updateUser(id, user)
  }
  componentDidMount() {
    this.props.getUser(this.props.match.params.userId)
    console.log('this.props', this.props)
  }

  render() {
    return this.props.singleUser ? (
      <div>
        <h2>User:</h2>
        <h3>{this.props.singleUser.id}</h3>
        <div>{this.props.singleUser.email}</div>
        <h2>Admin:</h2>
        <p>{this.props.singleUser.isAdmin === false ? 'false' : 'true'}</p>
        {this.props.singleUser.orders ? (
          this.props.singleUser.orders.map(order => {
            return (
              <div key={order.id}>
                <h2>id:</h2>
                <p>{order.id}</p>
                <h2>status:</h2>
                <p>{order.status === null ? 'null' : order.status}</p>
              </div>
            )
          })
        ) : (
          <div>no orders</div>
        )}
        <button onClick={this.handleSubmit} type="button">
          Upgrade user To Admin
        </button>
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
