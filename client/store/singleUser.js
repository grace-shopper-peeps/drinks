import axios from 'axios'
const GET_SINGLE_USER = 'GET_SINGLE_USER'

const singleUser = user => ({type: GET_SINGLE_USER, user})
// thunk is not getting the right id
export const getSingleUser = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${id}`)
    console.log(data)
    dispatch(singleUser(data))
  } catch (err) {
    console.error(err)
  }
}
export const selectUserReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_USER:
      return action.user
    default:
      return state
  }
}
export default selectUserReducer
