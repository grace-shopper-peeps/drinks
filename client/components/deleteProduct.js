import React from 'react'
import {deleteProductThunk} from '../store/product'
import {connect} from 'react-redux'

class DeleteProduct extends React.Component {
  delete(id) {
    console.log('clicked')
    this.props.deleteProduct(id)
  }
  render() {
    console.log(this.props, 'props on delete product')
    const productId = this.props.product.id
    return (
      <button type="submit" onClick={() => this.delete(productId)}>
        Delete Product
      </button>
    )
  }
}
// const AddToCart = props => {
const mapDispatch = dispatch => ({
  deleteProduct: id => dispatch(deleteProductThunk(id))
})

export default connect(null, mapDispatch)(DeleteProduct)
