import React from 'react'
import {connect} from 'react-redux'
import {
  deleteCartItem,
  updateProductQuantity,
  fetchOrderProducts
} from '../store/cart'

class CartProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // totalProductPrice:,
      quantity: this.props.cartItem.quantity
        ? this.props.cartItem.quantity
        : this.props.cartItem.throughProductOrders
    }
    this.handleChange = this.handleChange.bind(this)
  }

  // componentDidMount() {
  //   this.props.getCart()
  // }

  removeItem(product) {
    this.props.removeItem(product)
  }

  handleChange(evt) {
    // console.log('bananas')
    // console.log(evt.target.value)
    this.setState({quantity: evt.target.value})
    const id = this.props.cartItem.id
      ? this.props.cartItem.id
      : this.props.cartItem.productId
    console.log('looking for cart item', this.props.cartItem)
    console.log('handle change cartItem', id)
    this.props.updateItem({
      quantity: evt.target.value,
      id: id,
      price: this.props.cartItem.price
    })
  }

  render() {
    const cartItem = this.props.cartItem
    console.log(' before cartItem', cartItem)
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
  removeItem: item => dispatch(deleteCartItem(item)),
  updateItem: quantityObj => dispatch(updateProductQuantity(quantityObj)),
  getCart: () => dispatch(fetchOrderProducts())
})
export default connect(null, mapDispatch)(CartProduct)
