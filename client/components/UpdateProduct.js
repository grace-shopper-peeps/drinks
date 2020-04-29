import React from 'react'
import {connect} from 'react-redux'
import {updateProductThunk} from '../store/products'
class UpdateProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      description: '',
      price: '',
      quantity: '',
      image: '',
      category: ''
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
    console.log('this state in handle submit: ', this.state)
    console.log('this props in HS ', this.props)
    event.preventDefault()
    this.props.updateProd(this.state, this.props.productId)
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
            value={this.state.category}
            name="category"
            placeholder="category"
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
    updateProd: (product, id) => dispatch(updateProductThunk(product, id))
  }
}
export default connect(mapState, mapDispatch)(UpdateProduct)
