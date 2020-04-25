import axios from 'axios'
import {DELETE_SINGLE_PRODUCT} from './product'
const ALL_PRODUCTS = 'ALL_PRODUCTS'

const allProducts = products => {
  return {
    type: ALL_PRODUCTS,
    products
  }
}

export const deleteSingleProduct = id => {
  return {
    type: DELETE_SINGLE_PRODUCT,
    id
  }
}

export const getAllProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(allProducts(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteProductThunk = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${id}`, id)
      dispatch(deleteSingleProduct(id))
    } catch (err) {
      console.log('there was an error deleting the product: ', err)
    }
  }
}

const initialState = []

const allProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_PRODUCTS:
      return action.products
    case DELETE_SINGLE_PRODUCT:
      return [...state].filter(product => {
        if (action.id !== product.id) {
          return product
        }
      })
    default:
      return state
  }
}
export default allProductsReducer
//s
