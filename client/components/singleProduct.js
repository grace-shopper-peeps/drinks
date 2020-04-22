import React from 'react'
import {fetchProductThunk} from '../store/product'
import {connect} from 'react-redux'
import AddToCart from './addToCart'
export class Product extends React.Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.productId)
  }

  render() {
    let product = this.props.product
    return (
      <div>
        <h3>{product.title}</h3>
        <img src={product.image} />
        <div>{`Price: ${product.price}`}</div>
        <p>{`Description: ${product.description}`}</p>
        <AddToCart />
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  product: state.product
})

export const mapDispatchToProps = dispatch => {
  return {
    getProduct: id => dispatch(fetchProductThunk(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
