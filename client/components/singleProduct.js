import React from 'react'
import {fetchProductThunk} from '../store/product'
import {connect} from 'react-redux'
import AddToCart from './addToCart'
import {ProductReviews} from './singleProductReviews'
import {getAllReviews} from '../store/reviews'
import DeleteProduct from './deleteProduct'
import UpdateProduct from './UpdateProduct'
import PostReview from './postReview'

export class Product extends React.Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.productId)
    this.props.getAllReviews()
  }

  render() {
    let product = this.props.product
    let reviews = this.props.reviews
    let user = this.props.user
    return (
      <div>
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h1 class="display-4">20% off all Bourbons!</h1>
            <p class="lead">
              We're so excited for you to join us! Take advantage of all our
              liquors from across the globe
            </p>
          </div>
        </div>
        <div class="product-view">
          <h1 class="product-item">{product.title}</h1>
          <img src={product.image} class="product-single-view" />
          <div class="product-item">${product.price}.00</div>
          <p class="product-item">{` ${product.description}`}</p>
          <AddToCart product={product} />
          {user && user.isAdmin ? (
            <div>
              <DeleteProduct product={product} />{' '}
              <UpdateProduct productId={product.id} product={product} />
            </div>
          ) : (
            ''
          )}
          <div id="submit-product-review">
            <h4>Post A Review </h4>
            <PostReview productId={product.id} />
            <hr />
            Reviews:
            <ProductReviews
              key={product.id}
              reviews={reviews}
              productId={product.id}
            />
          </div>
        </div>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  product: state.product,
  reviews: state.reviews,
  user: state.user
})

export const mapDispatchToProps = dispatch => {
  return {
    getProduct: id => dispatch(fetchProductThunk(id)),
    getAllReviews: () => dispatch(getAllReviews())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
