import axios from 'axios'
const GET_SINGLE_USER = 'GET_SINGLE_USER'
const UPDATE_SINGLE_USER = 'UPDATE_SINGLE_USER'

const singleUser = user => ({type: GET_SINGLE_USER, user})
const updateUser = updatedUser => ({type: UPDATE_SINGLE_USER, updatedUser})

// thunk is not getting the right id
export const getSingleUser = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${id}`)
    dispatch(singleUser(data))
  } catch (err) {
    console.error(err)
  }
}

export const updateSingleUser = (id, user) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/users/${id}`, user)
    dispatch(updateUser(data))
  } catch (err) {
    console.error(err)
  }
}

export const selectUserReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_USER:
      return action.user
    case UPDATE_SINGLE_USER:
      return action.updatedUser
    default:
      return state
  }
}
export default selectUserReducer
