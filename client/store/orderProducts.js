import axios from 'axios'

const GET_ORDER_PRODUCTS = 'GET_ORDER_PRODUCTS'

export const getOrderProducts = products => ({
  type: GET_ORDER_PRODUCTS,
  products
})

export const fetchOrderProducts = orderId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`api/cart/${orderId}`)
      dispatch(getOrderProducts(data)) //expect data to be an array with all the products with that orderId
    } catch (err) {
      console.log('Error fetching order-products')
    }
  }
}

const initialState = []

export default function orderProducts(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER_PRODUCTS:
      return action.products
    default:
      return state
  }
}
