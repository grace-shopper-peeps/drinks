import axios from 'axios'

const GET_ORDER = 'GET_ORDER'

export const getOrder = order => ({
  type: GET_ORDER,
  order
})

export const fetchOrder = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cart`)
      dispatch(getOrder(data))
    } catch (err) {
      console.log('Error fetching order')
    }
  }
}

const initialState = {}
export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    default:
      return state
  }
}
