import React from 'react'
import {connect} from 'react-redux'
import {fetchOrderProducts} from '../store/cart'

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
    console.log('hey')
    //check instance method on order-price in db
    //need image and title from Product table
    return (
      <div>
        <h1>Cart Summary:</h1>
        <div>
          {cartItems.map(cartItem => {
            return (
              <p>
                prouctId:
                <b>{cartItem.id}</b>
                ---- qty:
                <b>{cartItem.quantity}</b>
                ---- price:
                <b>{cartItem.price}</b>
                -----total Price:
                <b>{/* {cartItem.products.map()
                  )} */}</b>
              </p>
            )
          })}
        </div>
        <b>Total Items: {cartItems.length}</b>
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  getCart: () => dispatch(fetchOrderProducts())
})

export default connect(mapState, mapDispatch)(Cart)
