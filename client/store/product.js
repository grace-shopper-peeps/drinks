import axios from 'axios'

const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'
export const DELETE_SINGLE_PRODUCT = 'DELETE_SINGLE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
//const UPGRADE_USER = 'UPGRADE_USER'

export const setSingleProduct = product => {
  return {
    type: SET_SINGLE_PRODUCT,
    product
  }
}

export const deleteSingleProduct = id => {
  return {
    type: DELETE_SINGLE_PRODUCT,
    id
  }
}

export const updateProduct = product => {
  return {
    type: UPDATE_PRODUCT,
    product
  }
}

export const fetchProductThunk = id => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/products/${id}`, id)
      const product = response.data
      dispatch(setSingleProduct(product))
    } catch (err) {
      console.log('there was an error fetching the product: ', err)
    }
  }
}

export const updateProductThunk = (product, id) => {
  return async dispatch => {
    try {
      const response = await axios.put(`/api/products/${id}`, product)
      let newProduct = response.data
      dispatch(updateProduct(newProduct))
    } catch (err) {
      console.log('there was an error updating the product: ', err)
    }
  }
}

export const deleteProductThunk = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${id}`, id)
      dispatch(deleteSingleProduct(id))
    } catch (err) {
      console.log('there was an error deleting the product: ', err)
    }
  }
}

const initialState = []

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.product
    case DELETE_SINGLE_PRODUCT:
      return {}
    case UPDATE_PRODUCT:
      return action.product
    default:
      return state
  }
}
