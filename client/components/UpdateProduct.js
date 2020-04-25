import React from 'react'
import {connect} from 'react-redux'
import updateProductThunk from '../store/products'
class UpdateProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      description: '',
      price: '',
      quantity: '',
      image: '',
      type: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(event.target.name, event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.updateProduct(this.state, this.props.productId)
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            value={this.state.title}
            name="title"
            placeholder="title"
          />
          <input
            onChange={this.handleChange}
            value={this.state.description}
            name="description"
            placeholder="description"
          />
          <input
            onChange={this.handleChange}
            value={this.state.price}
            name="price"
            placeholder="price"
          />
          <input
            onChange={this.handleChange}
            value={this.state.quantity}
            name="quantity"
            placeholder="quantity"
          />
          <input
            onChange={this.handleChange}
            value={this.state.image}
            name="image"
            placeholder="image"
          />
          <input
            onChange={this.handleChange}
            value={this.state.type}
            name="type"
            placeholder="type"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
//hello
const mapState = state => {
  return {
    products: state.products
  }
}
const mapDispatch = dispatch => {
  return {
    updateProduct: (product, id) => dispatch(updateProductThunk(product, id))
  }
}
export default connect(mapState, mapDispatch)(UpdateProduct)
