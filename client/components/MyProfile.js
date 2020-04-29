import React from 'react'
import {connect} from 'react-redux'
//import {fetchAllUsers} from '../store/allUsers'
import {getSingleUser, updateSingleUser} from '../store/singleUser'
import {updateUserThunk} from '../store/user'
import {Button, Card, Form} from 'react-bootstrap'

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
  }
  changeProfile() {
    this.setState({
      showForm: !this.state.showForm
    })
  }
  render() {
    return (
      <div>
        <Card id="carded">
          <Card.Header as="h5">My Email:</Card.Header>
          <Card.Body>
            <Card.Title />
            <Card.Text>
              {' '}
              {this.props.user.email ? this.props.user.email : 'No email'}
            </Card.Text>

            <Button onClick={this.changeProfile} type="button">
              Change Status
            </Button>
            {this.state.showForm ? (
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address:</Form.Label>
                  <input
                    onChange={this.handleChange}
                    name="email"
                    value={this.state.email}
                    placeholder="email"
                  />
                </Form.Group>
                <Button type="submit">Submit</Button>
              </Form>
            ) : null}
          </Card.Body>
        </Card>
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
