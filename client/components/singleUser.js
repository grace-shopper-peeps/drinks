import React from 'react'
import {connect} from 'react-redux'
import {getUserThunk} from '../store/allUsers'

class SingleUser extends React.Component {
  componentDidMount() {
    this.props.singUser(this.props.match.params.userId)
  }
  render() {
    console.log(this.props, 'this.props on single user')
    return <h3>Account Id</h3>
  }
}

const mapDispatchToProps = dispatch => {
  console.log('are we mapping dispatch')
  return {
    singUser: id => dispatch(getUserThunk(id))
  }
}

export default connect(null, mapDispatchToProps)(SingleUser)
