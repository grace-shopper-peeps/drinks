import React from 'react'
import {connect} from 'react-redux'
import {getAllProducts} from '../store/products'

class Products extends React.Component {
  componentDidMount() {
    this.props.getProducts()
    console.log(this.props)
  }
  render() {
    return (
      <div>
        <div>
          {this.props.products.map(product => {
            return (
              <div key={product.id}>
                <img src={product.image} />
                <h3>Title: </h3>
                <p>{product.title}</p>
                <h3>Description: </h3>
                <p>{product.description}</p>
                <h3>Price: </h3>
                <p>{product.price}</p>
                <h3>Quantity: </h3>
                <p>{product.quantity}</p>
                <h3>Type: </h3>
                <p>{product.category ? product.category.name : 'null'}</p>
              </div>
            )
          })}
        </div>
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
    getProducts: () => dispatch(getAllProducts())
  }
}
export default connect(mapState, mapDispatch)(Products)
