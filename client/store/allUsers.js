import axios from 'axios'

const GET_ALL_USERS = 'GET_ALL_USERS'
const DELETE_USER = 'DELETE_USER'
const GET_SINGLE_USER = 'GET_SINGLE-USER'

export const getAllUsers = users => ({type: GET_ALL_USERS, users})
export const getSingleUser = id => ({type: GET_SINGLE_USER, id})
export const deleteUser = id => ({type: DELETE_USER, id})

export const fetchAllUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(getAllUsers(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const getUserThunk = id => {
  return async dispatch => {
    try {
      const response = await axios.get(`api/users/${id}`, id)
      const singleUser = response.data
      dispatch(getSingleUser(singleUser))
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteUserThunk = id => {
  return async dispatch => {
    try {
      await axios.delete(`api/users/${id}`, id)
      dispatch(deleteUser(id))
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = []

const allUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    case GET_SINGLE_USER:
      return [...state].filter(user => {
        if (user.id === action.id) {
          return user
        }
      })
    case DELETE_USER:
      return [...state].filter(user => {
        if (user.id !== action.id) {
          return user
        }
      })
    default:
      return state
  }
}

export default allUsersReducer
