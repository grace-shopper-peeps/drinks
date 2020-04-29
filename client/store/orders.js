import axios from 'axios'

const ALL_ORDERS = 'ALL_ORDERS'
const UPDATE_ORDERS = 'UPDATE_ORDERS'

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_CREATED: 'SHOW_CREATED',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_CANCELLED: 'SHOW_CANCELLED',
  SHOW_PROCESSING: 'SHOW_PROCESSING'
}

export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter
})

export const allOrders = orders => {
  return {
    type: ALL_ORDERS,
    orders
  }
}

export const updateOrder = order => {
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
      console.log('there was an error updating the order: ', err)
    }
  }
}

const initialState = {orders: [], visibleOrders: []}

const allOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_ORDERS:
      return {...state, orders: action.orders, visibleOrders: action.orders}
    case SET_VISIBILITY_FILTER:
      return {
        ...state,
        visibleOrders: state.orders.filter(order => {
          if (action.filter === order.status) {
            return order
          }
        })
      }
    // case UPDATE_ORDERS:
    //   return action.order
    default:
      return state
  }
}
export default allOrdersReducer
