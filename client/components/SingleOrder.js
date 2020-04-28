import React from 'react'
import {getOrder} from '../store/singleOrder'
import {connect} from 'react-redux'

export class SingleOrder extends React.Component {
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
    getSingleOrder: id => dispatch(getOrder(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
