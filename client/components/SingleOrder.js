import React from 'react'
import {getOrder, changeStatus} from '../store/singleOrder'
import {connect} from 'react-redux'
import {Button, Dropdown, Card} from 'react-bootstrap'
export class SingleOrder extends React.Component {
  constructor() {
    super()
    this.state = {
      dropDown: false
    }
    this.showDropDown = this.showDropDown.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.props.order.status = event.target.value
    this.props.changeOrderStatus(this.props.order)
  }
  showDropDown() {
    this.setState({
      dropDown: !this.state.dropDown
    })
  }

  componentDidMount() {
    this.props.getSingleOrder(this.props.match.params.orderId)
  }

  render() {
    return (
      <div>
        <Card id="carded">
          <Card.Header as="h5">
            User Email:{' '}
            {this.props.order.user ? this.props.order.user.email : 'No email'}
          </Card.Header>
          <Card.Body>
            <Card.Title>Order Number:</Card.Title>
            <Card.Text>{this.props.order.id}</Card.Text>
            <Card.Title>Status:</Card.Title>
            <Card.Text>
              {this.props.order.status === null
                ? 'null'
                : this.props.order.status}
            </Card.Text>
            <Button onClick={this.showDropDown} type="button">
              Change Status
            </Button>
            {this.state.dropDown && (
              <select onChange={this.handleChange}>
                <option value="Created">Created</option>
                <option value="Processing">Processing</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
              </select>

              //           <DropdownButton id="dropdown-basic-button" title="Choose Status">
              //   <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              //   <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              //   <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              //   <Dropdown.Item onClick={this.handleChange} value="Completed">Completed</Dropdown.Item>
              // </DropdownButton>
            )}
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  product: state.product,
  reviews: state.reviews,
  order: state.singleOrder
})

export const mapDispatchToProps = dispatch => {
  return {
    getSingleOrder: id => dispatch(getOrder(id)),
    changeOrderStatus: order => dispatch(changeStatus(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
