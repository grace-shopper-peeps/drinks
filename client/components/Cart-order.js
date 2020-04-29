import React from 'react'
import {connect} from 'react-redux'
import {fetchOrderProducts} from '../store/cart'
import Checkout from './Checkout'
import CartProduct from './CartProduct'

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCart() // go to the back and fetch all products in order-product table with associated orderId
    // need to get orderID from props passed from SingleDrink or AllDrinks component or pull it from the front
  }

  removeItem(item) {
    this.props.removeItem(item)
  }

  updateCart(product) {
    this.props.updateItem(product)
  }

  render() {
    const cartItems = this.props.cart
    console.log('mhahaha', cartItems)
    console.log('hey')
    //check instance method on order-price in db
    //need image and title from Product table
    return (
      <div>
        <h1>Cart Summary:</h1>
        <div>
          {cartItems.length > 0
            ? cartItems.map(cartItem => <CartProduct cartItem={cartItem} />)
            : "You're cart is empty, start shoppin!"}
        </div>
        <b>Total Items: {cartItems.length}</b>
        <p>
          <b>subtotal:5.99</b>
        </p>
        <p>
          <b>local taxes:2.49</b>
        </p>
        <p>
          <b>Total:$389.99</b>
        </p>
        <Checkout cart={this.props.cart} />
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  getCart: () => dispatch(fetchOrderProducts())
  // updateItem: (product) => dispatch(addProductToCart(product)),
})

export default connect(mapState, mapDispatch)(Cart)
