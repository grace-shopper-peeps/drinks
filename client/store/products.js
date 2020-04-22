import axios from 'axios'

const ALL_PRODUCTS = 'ALL_PRODUCTS'

const allProducts = products => {
  return {
    type: ALL_PRODUCTS,
    products
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

const initialState = []

const allProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}
export default allProductsReducer
