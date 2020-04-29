import React from 'react'
import {connect} from 'react-redux'
import {getAllProducts} from '../store/products'
import {Link} from 'react-router-dom'
import AddToCart from './addToCart'
import DeleteProduct from './deleteProduct'
import AddProduct from './addProduct'

class Products extends React.Component {
  componentDidMount() {
    this.props.getProducts()
    console.log(this.props)
  }
  render() {
    const products = this.props.products || []
    const user = this.props.user
    console.log(this.props, 'this.props of products')
    return (
      <div class="backdrop">
        {user.Admin ? (
          <AddProduct />
        ) : (
          <div class="jumbotron jumbotron-fluid">
            <div class="container">
              <h1 class="display-4">20% off all Bourbons!</h1>
              <p class="lead">
                We're so excited for you to join us! Take advantage of all our
                liquors from across the globe.
              </p>
            </div>
          </div>
        )}

        <ul class="list-unstyled">
          {products.map(product => {
            return (
              <li
                href={`/products/${product.id}`}
                class="media"
                key={product.id}
              >
                <img src={product.image} class="pic" />
                <div class="media-body">
                  <p class="product-title">{product.title}</p>
                  <p class="product-description">{product.description}</p>
                  <p class="product-description">price:{product.price}</p>
                  <p class="product-description">
                    category:
                    {product.category ? product.category.name : 'null'}
                  </p>
                  <AddToCart product={product} />

                  {user && user.isAdmin ? (
                    <DeleteProduct product={product} />
                  ) : (
                    ''
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
//hello
const mapState = state => {
  return {
    products: state.products,
    user: state.user
  }
}
const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(getAllProducts())
  }
}
export default connect(mapState, mapDispatch)(Products)
