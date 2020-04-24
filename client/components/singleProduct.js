import React from 'react'
import {fetchProductThunk} from '../store/product'
import {connect} from 'react-redux'
import AddToCart from './addToCart'
import {ProductReviews} from './singleProductReviews'
import {getAllReviews} from '../store/reviews'

export class Product extends React.Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.productId)
    this.props.getAllReviews()
  }

  render() {
    let product = this.props.product
    let reviews = this.props.reviews
    console.log(this.props)
    console.log('product', product)
    return (
      <div>
        <h3>{product.title}</h3>
        <img src={product.image} />
        <div>{`Price: ${product.price}`}</div>
        <p>{`Description: ${product.description}`}</p>
        <div>Reviews: </div>
        <ProductReviews
          key={product.id}
          reviews={reviews}
          productId={product.id}
        />
        <AddToCart product={product} />
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  product: state.product,
  reviews: state.reviews
})

export const mapDispatchToProps = dispatch => {
  return {
    getProduct: id => dispatch(fetchProductThunk(id)),
    getAllReviews: () => dispatch(getAllReviews())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
