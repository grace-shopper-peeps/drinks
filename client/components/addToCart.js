import React from 'react'
import {addProductToCart} from '../store/cart'
import {connect} from 'react-redux'

class AddToCart extends React.Component {
  addProduct(product) {
    console.log('clicked')
    this.props.addItem(product)
  }
  render() {
    // const productId = this.props.id
    return (
      <button
        type="submit"
        onClick={() =>
          this.addProduct({productId: 1, quantity: 15, price: 25.0})
        }
      >
        Add To Cart
      </button>
    )
  }
}
// const AddToCart = props => {
const mapDispatch = dispatch => ({
  addItem: product => dispatch(addProductToCart(product))
})

export default connect(null, mapDispatch)(AddToCart)
