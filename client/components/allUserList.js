import React from 'react'
import {connect} from 'react-redux'
import {fetchAllUsers} from '../store/allUsers'
import DeleteUser from './deleteUser'
import {Link} from 'react-router-dom'
import {Button, Table} from 'react-bootstrap'

// import SingleUser from './singleUser'
export class UserList extends React.Component {
  componentDidMount() {
    this.props.allUsers()
  }

  render() {
    const user = this.props.user
    return user && user.isAdmin ? (
      <div>
        <h2>Users:</h2>
        <div>
          {this.props.users.map(eachUser => {
            return (
              <div key={eachUser.id}>
                <Table id="orderTable" striped bordered hover>
                  <thead>
                    <tr>
                      <th>
                        User Email <DeleteUser eachUser={eachUser} />
                      </th>
                      <th>ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <Link to={`/users/${eachUser.id}`}>
                        <td>{eachUser.email}</td>
                      </Link>
                      <td>{eachUser.id}</td>
                    </tr>
                  </tbody>
                </Table>
                {/* <h3>Account Id: </h3>
                  <h3>User Email:</h3>
                  <div>{eachUser.email}</div> */}

                {/* <SingleUser eachUser={eachUser} singleUserId={eachUser.id}/> */}
              </div>
            )
          })}
        </div>
      </div>
    ) : (
      'Unauthorized'
    )
  }
}

const mapState = state => {
  return {
    users: state.users,
    user: state.user
  }
}

const mapDispatch = dispatch => ({
  allUsers: () => dispatch(fetchAllUsers())
})

export default connect(mapState, mapDispatch)(UserList)
