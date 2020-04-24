import axios from 'axios'

const GET_ORDER_PRODUCTS = 'GET_ORDER_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'

export const getOrderProducts = products => ({
  type: GET_ORDER_PRODUCTS,
  products
})

export const addProducts = addedProducts => ({
  type: ADD_PRODUCT,
  addedProducts
})

export const fetchOrderProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`api/cart/`)
      dispatch(getOrderProducts(data)) //expect data to be an array with all the products with that orderId
    } catch (err) {
      console.log('Error fetching order-products')
    }
  }
}

export const addProductToCart = product => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/cart', product)
      dispatch(addProducts(data))
    } catch (err) {
      console.log('could not add product to cart')
    }
  }
}

const initialState = []

export default function orderProducts(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER_PRODUCTS:
      return action.products
    case ADD_PRODUCT:
      return [...state, action.addedProducts]
    default:
      return state
  }
}
