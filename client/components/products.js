import React from 'react'
import {connect} from 'react-redux'
import {getAllProducts, filterProductThunk} from '../store/products'
import {Link} from 'react-router-dom'
import AddToCart from './addToCart'
import DeleteProduct from './deleteProduct'
import AddProduct from './addProduct'
import Dropdown from 'react-bootstrap/Dropdown'

class Products extends React.Component {
  constructor() {
    super()
    this.handleSelect = this.handleSelect.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
    if (window.location.search !== '') {
      let urlParams = new URLSearchParams(window.location.search)
      this.props.filterProds(urlParams.get('filter'))
    }
  }

  handleSelect(eventKey) {
    window.location.search = `filter=${eventKey}`
    this.props.filterProds(eventKey)
    console.log(this.props)
  }
  render() {
    const products = this.props.products || []
    const user = this.props.user

    return (
      <div>
        <AddProduct />
        <Dropdown onSelect={this.handleSelect}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="vodka">Vodka</Dropdown.Item>
            <Dropdown.Item eventKey="rum">Rum</Dropdown.Item>
            <Dropdown.Item eventKey="bourbon">Bourbon</Dropdown.Item>
            <Dropdown.Item eventKey="gin">Gin</Dropdown.Item>
            <Dropdown.Item eventKey="tequila">Tequila</Dropdown.Item>
            <Dropdown.Item eventKey="misc">Misc</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div className="container">
          {products.map(product => {
            return (
              <div className="drinks" key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <img src={product.image} />
                  <h3>Title: </h3>
                  <p>{product.title}</p>
                </Link>
                <h3>Description: </h3>
                <p>{product.description}</p>
                <h3>Price: </h3>
                <p>{product.price}</p>
                <h3>Quantity: </h3>
                <p>{product.quantity}</p>
                <h3>Type: </h3>
                <p>{product.category ? product.category.name : 'null'}</p>
                <AddToCart product={product} />
                {user && user.isAdmin ? (
                  <DeleteProduct product={product} />
                ) : (
                  ''
                )}
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
    products: state.products,
    user: state.user
  }
}
const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(getAllProducts()),
    filterProds: filter => dispatch(filterProductThunk(filter))
  }
}
export default connect(mapState, mapDispatch)(Products)
