import React from 'react'
import {addProductToCart} from '../store/cart'
import {connect} from 'react-redux'

class AddToCart extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleChange = this.handleChange.bind(this)
  }

  // handleChange(evt) {
  //   return {[evt.target.name]: evt.target.value}
  // }

  handleSubmit(evt) {
    evt.preventDefault()
    const productQuantity = Number(evt.target.quantity.value)
    const product = this.props.product
    product.price = Number(product.price)
    product.quantity = productQuantity
    console.log('product', product)
    this.props.addItem(product)
  }
  // addProduct(product) {
  //   console.log('clicked')
  //   product.quantity = this.state.quantity
  //   this.props.addItem(product)
  // }
  render() {
    // const productId = this.props.id
    // console.log('this is the current product', product)
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="number"
          name="quantity"
          // onChange={this.handleChange}
        />
        <button type="submit">Add To Cart</button>
      </form>
    )
  }
}

// const mapState = (state) => ({
//   product: state.product,
// })

const mapDispatch = dispatch => ({
  addItem: product => dispatch(addProductToCart(product))
})

export default connect(null, mapDispatch)(AddToCart)
