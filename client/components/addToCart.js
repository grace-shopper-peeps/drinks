import React from 'react'
import {addProductToCart} from '../store/orderProducts'
import {connect} from 'react-redux'

class AddToCart extends React.Component {
  addProduct(product) {
    console.log('clicked')
    this.props.addItem(product)
  }
  render() {
    // const productId = this.props.id
    const product = this.props.product
    return (
      <button type="submit" onClick={() => this.addProduct(product)}>
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
