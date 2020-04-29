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
        <h3>{product.title}</h3>
        <img src={product.image} />
        <div>{`Price: ${product.price}`}</div>
        <p>{`Description: ${product.description}`}</p>
        <AddToCart product={product} />
        {user && user.isAdmin ? (
          <div>
            <DeleteProduct product={product} />{' '}
            <UpdateProduct productId={product.id} product={product} />
          </div>
        ) : (
          ''
        )}
        <h4>Post A Review: </h4>
        <PostReview />
        <hr />
        <div>Reviews: </div>
        <ProductReviews
          key={product.id}
          reviews={reviews}
          productId={product.id}
        />
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
