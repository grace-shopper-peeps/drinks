import React from 'react'
import {getOrder, changeStatus} from '../store/singleOrder'
import {connect} from 'react-redux'

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
    console.log('this.props single order', this.props.order)
    return (
      <div>
        <h2>User Email:</h2>
        <p>
          {this.props.order.user ? this.props.order.user.email : 'No email'}
        </p>
        <h2>Order Number:</h2>
        <p>{this.props.order.id}</p>
        <h2>Status:</h2>
        <p>
          {this.props.order.status === null ? 'null' : this.props.order.status}
        </p>
        <button onClick={this.showDropDown} type="button">
          Change Status
        </button>
        {this.state.dropDown && (
          <select onChange={this.handleChange}>
            <option value="Created">Created</option>
            <option value="Processing">Processing</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option>
          </select>
        )}
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
