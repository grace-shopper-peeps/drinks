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
      totalProductPrice: 0,
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
    const newTotal =
      Number(evt.target.value) * Number(this.props.cartItem.price)
    this.setState({
      totalProductPrice: newTotal,
      quantity: evt.target.value
    })
    const id = this.props.cartItem.id
      ? this.props.cartItem.id
      : this.props.cartItem.productId

    this.props.updateItem({
      quantity: evt.target.value,
      id: id,
      price: this.props.cartItem.price,
      totalPrice: this.state.totalProductPrice
    })
  }

  render() {
    const cartItem = this.props.cartItem
    const cartItemId = this.props.cartItem.id
      ? this.props.cartItem.id
      : this.props.cartItem.productId
    return (
      <li class="cart-item">
        <img src={cartItem.image} class="cart-pic" />
        <div class="cart-media-body">
          <p class="product-title">product:{cartItem.title}</p>
          <p class="product-quantity">quantity:{cartItem.quantity}</p>
          <p class="product-description">price: ${cartItem.price}.00</p>
          <p class="product-description">
            total Price: ${this.state.totalProductPrice}.00
          </p>
          <p>
            <a href={`/products/${cartItemId}`} class="stretched-link">
              {cartItem.title}
            </a>
          </p>
          qty:
          <input
            type="number"
            name="quantity"
            value={this.state.quantity}
            onChange={this.handleChange}
          />
          <button type="button" onClick={() => this.removeItem(cartItem)}>
            Remove Item
          </button>
        </div>
      </li>
    )
  }
}
const mapDispatch = dispatch => ({
  removeItem: item => dispatch(deleteCartItem(item)),
  updateItem: quantityObj => dispatch(updateProductQuantity(quantityObj)),
  getCart: () => dispatch(fetchOrderProducts())
})
export default connect(null, mapDispatch)(CartProduct)
