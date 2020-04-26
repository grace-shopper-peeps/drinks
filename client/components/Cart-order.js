import React from 'react'
import {connect} from 'react-redux'
import {fetchOrderProducts, deleteCartItem} from '../store/cart'

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCart() // go to the back and fetch all products in order-product table with associated orderId
    // need to get orderID from props passed from SingleDrink or AllDrinks component or pull it from the front
  }

  removeItem(item) {
    this.props.removeItem(item)
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
            ? cartItems.map(cartItem => {
                return (
                  <p>
                    <img src={cartItem.image} />
                    product:
                    <b>{cartItem.title}</b>
                    ---- qty:
                    <b>{cartItem.quantity}</b>
                    ---- price:
                    <b>{cartItem.price}</b>
                    -----total Price:
                    {/* <b>{cartItem.throughProductOrders.purchasePrice}</b> */}
                    <button
                      type="button"
                      onClick={() => this.removeItem(cartItem)}
                    >
                      Remove Item
                    </button>
                  </p>
                )
              })
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
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  getCart: () => dispatch(fetchOrderProducts()),
  removeItem: item => dispatch(deleteCartItem(item))
})

export default connect(mapState, mapDispatch)(Cart)
