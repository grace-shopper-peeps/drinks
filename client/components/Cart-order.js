import React from 'react'
import {connect} from 'react-redux'
import {fetchOrder} from '../store/order'
import {fetchOrderProducts} from '../store/orderProducts'

class Order extends React.Component {
  componentDidMount() {
    this.props.getOrderProducts(orderId) // go to the back and fetch all products in order-product table with associated orderId
    this.props.getOrder(orderId) // need to get orderID from props passed from SingleDrink or AllDrinks component or pull it from the front
  }

  removeItem(item) {
    this.props.removeItem(item)
  }

  render() {
    const cartItems = this.props.drinks
    const totalOrder = this.props.order

    return (
      <div>
        <h1>Cart Summary:</h1>
        <div>
          {cartItems.map(cartItem => {
            return (
              <div>
                {cartItem.imageUrl}-{cartItem.title}-{cartItem.price}-
                {cartItem.quantity}
              </div>
            )
          })}
        </div>
        {totalOrder.quantity}-{totalOrder.price}
      </div>
    )
  }
}

const mapState = state => ({
  orderProducts: state.orderProducts,
  order: state.order
})

const mapDispatch = dispatch => ({
  getOrderProducts: orderId => dispatch(fetchOrderProducts(orderId)),
  getOrder: orderId => dispatch(fetchOrder(orderId))
})

export default connect(mapState, mapDispatch)(Order)
