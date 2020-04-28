import axios from 'axios'

const CHANGE_ORDER = 'CHANGE_ORDER'
const SINGLE_ORDER = 'SINGLE_ORDER'

export const singleOrder = order => {
  return {
    type: SINGLE_ORDER,
    order
  }
}

export const orderStatus = order => {
  return {
    type: CHANGE_ORDER,
    order
  }
}

export const getOrder = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/${id}`)
      dispatch(singleOrder(data))
    } catch (err) {
      console.log(err)
    }
  }
}
export const changeStatus = order => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/orders/${order.id}`, order)
      dispatch(orderStatus(data))
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = {}

const singleOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SINGLE_ORDER:
      return action.order
    case CHANGE_ORDER:
      return action.order
    default:
      return state
  }
}
export default singleOrderReducer
