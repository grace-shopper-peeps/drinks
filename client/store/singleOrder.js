import axios from 'axios'

const SINGLE_ORDER = 'SINGLE_ORDER'

export const singleOrder = order => {
  return {
    type: SINGLE_ORDER,
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

const initialState = {}

const singleOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SINGLE_ORDER:
      return action.order
    default:
      return state
  }
}
export default singleOrderReducer
