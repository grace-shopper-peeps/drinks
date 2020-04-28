import React from 'react'
import {connect} from 'react-redux'
import {deleteCartItem, updateProductQuantity} from '../store/cart'

class CartProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: this.props.cartItem.throughProductOrders.quantity
    }
    this.handleChange = this.handleChange.bind(this)
  }

  removeItem(product) {
    this.props.removeItem(product)
  }

  handleChange(evt) {
    this.setState({quantity: evt.target.quantity.value})
    // this.props.updateItem(this.state.quantity)
  }

  render() {
    const cartItem = this.props.cartItem
    console.log('cartItem', cartItem)
    return (
      <p>
        <img src={cartItem.image} />
        product:
        <b>{cartItem.title}</b>
        ---- qty:
        <b>{cartItem.throughProductOrders.quantity}</b>
        ---- price:
        <b>{cartItem.price}</b>
        -----total Price:
        {/* <b>{cartItem.throughProductOrders.purchasePrice}</b> */}
        <button type="button" onClick={() => this.removeItem(cartItem)}>
          Remove Item
        </button>
        <div>
          qty:
          <input
            type="number"
            name="quantity"
            value={this.state.quantity}
            onChange={this.handleChange}
          />
        </div>
      </p>
    )
  }
}
const mapDispatch = dispatch => ({
  removeItem: item => dispatch(deleteCartItem(item))
  // updateItem: (quantityObj) => dispatch(updateProductQuantity(quantityObj)),
})
export default connect(null, mapDispatch)(CartProduct)
