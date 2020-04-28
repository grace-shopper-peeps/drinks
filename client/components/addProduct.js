import React from 'react'
import {connect} from 'react-redux'
import {postProductThunk} from '../store/products'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

export class AddProduct extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.postProduct({
      title: event.target.title.value,
      description: event.target.description.value,
      price: event.target.price.value,
      quantity: event.target.quantity.value,
      category: event.target.category.value
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
        >
          <input
            type="text"
            name="title"
            placeholder="Product Name"
            required={true}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            required={true}
          />
          <input type="text" name="price" placeholder="Price" required={true} />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            required={true}
          />
          <input type="text" name="category" placeholder="Category" />
          <Button
            variant="contained"
            color="primary"
            size="small"
            type="submit"
          >
            Submit
          </Button>
        </Grid>
      </form>
    )
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    postProduct: product => dispatch(postProductThunk(product))
  }
}

export default connect(null, mapDispatchToProps)(AddProduct)
