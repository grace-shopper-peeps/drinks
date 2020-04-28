import React from 'react'
import {connect} from 'react-redux'
//import {fetchAllUsers} from '../store/allUsers'
import {getSingleUser, updateSingleUser} from '../store/singleUser'
import {updateUserThunk} from '../store/user'
export class MyProfile extends React.Component {
  constructor() {
    super()
    this.state = {
      showForm: false,
      email: '',
      id: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeProfile = this.changeProfile.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.updateUser(this.state)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(event.target.name, event.target.value)
  }
  changeProfile() {
    this.setState({
      showForm: !this.state.showForm
    })
  }
  render() {
    console.log('in render', this.props.user)
    return (
      <div>
        <h2>My Email:</h2>
        <p>{this.props.user.email}</p>
        {/* <h2>My Id:</h2>
     <p>{this.props.user.id}</p>
     <h2>Admin:</h2>
     <p>{this.props.user.isAdmin ? 'true' : 'false'}</p> */}
        <button onClick={this.changeProfile} type="button">
          Edit My Profile
        </button>
        {this.state.showForm ? (
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleChange}
              name="email"
              value={this.state.email}
              placeholder="email"
            />
            <button type="submit">Submit</button>
          </form>
        ) : null}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    singleUser: state.selectedUser
  }
}

const mapDispatch = dispatch => ({
  getUser: id => dispatch(getSingleUser(id)),
  updateUser: user => dispatch(updateUserThunk(user))
})

export default connect(mapState, mapDispatch)(MyProfile)
