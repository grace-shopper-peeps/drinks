import React from 'react'
import {connect} from 'react-redux'
import {fetchOrderProducts} from '../store/cart'
import Checkout from './Checkout'
import CartProduct from './CartProduct'

class Cart extends React.Component {
  constructor() {
    super()
    this.orderTotal = this.orderTotal.bind(this)
  }
  componentDidMount() {
    this.props.getCart()
    // this.orderTotal(this.props.cart) // go to the back and fetch all products in order-product table with associated orderId
    // need to get orderID from props passed from SingleDrink or AllDrinks component or pull it from the front
  }

  orderTotal(arr) {
    arr.reduce((accum, i) => {
      const productTotal = i.quantity * i.price((accum += productTotal))
      return accum
    }, 0)
  }

  removeItem(item) {
    this.props.removeItem(item)
  }

  updateCart(product) {
    this.props.updateItem(product)
  }

  render() {
    const cartItems = this.props.cart
    //check instance method on order-price in db
    //need image and title from Product table
    return (
      <div>
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h1 class="display-4">20% off all Bourbons!</h1>
            <p class="lead">
              We're so excited for you to join us! Take advantage of all our
              liquors from across the globe
            </p>
          </div>
        </div>
        <div>
          <h1>Cart Summary:</h1>
          <ul class="list-unstyled">
            {cartItems.length > 0
              ? cartItems.map(cartItem => (
                  <CartProduct cartItem={cartItem} key={cartItem.id} />
                ))
              : "You're cart is empty, start shoppin!"}
          </ul>
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
