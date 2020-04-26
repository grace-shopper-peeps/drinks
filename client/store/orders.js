import axios from 'axios'

const ALL_ORDERS = 'ALL_ORDERS'
const UPDATE_ORDERS = 'UPDATE_ORDERS'

const allOrders = orders => {
  return {
    type: ALL_ORDERS,
    orders
  }
}

const updateOrder = order => {
  return {
    type: UPDATE_ORDERS,
    order
  }
}

export const getAllOrders = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/orders')
      const orders = response.data
      console.log('thunk orders: ', orders)
      dispatch(allOrders(orders))
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateOrderThunk = (order, id) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/orders/${id}`, order)
      dispatch(updateOrder(data))
    } catch (err) {
      console.log('there was an error deleting the order: ', err)
    }
  }
}

const initialState = []

const allOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_ORDERS:
      return action.orders
    // case UPDATE_ORDERS:
    //   return action.order
    default:
      return state
  }
}
export default allOrdersReducer
