import axios from 'axios'

const ADD_PRODUCT = 'ADD_PRODUCT'
const GET_ORDER_PRODUCTS = 'GET_ORDER_PRODUCTS'
const DELETE_ITEM = 'DELETE_ITEM'
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY'

export const getOrderProducts = products => ({
  type: GET_ORDER_PRODUCTS,
  products
})

export const deleteItem = product => ({
  type: DELETE_ITEM,
  productId: product.id
})

export const addProducts = addedProducts => ({
  type: ADD_PRODUCT,
  addedProducts
})

export const updateItemQuantity = itemQuantityUpdated => ({
  type: UPDATE_ITEM_QUANTITY,
  itemQuantityUpdated
})

export const fetchOrderProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`api/cart/`)
      dispatch(getOrderProducts(data)) //expect data to be an array with all the products with that orderId
    } catch (err) {
      console.log('Error fetching order-products')
    }
  }
}

export const addProductToCart = product => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/cart', product)
      dispatch(addProducts(data))
    } catch (err) {
      console.log('could not add product to cart')
    }
  }
}

export const deleteCartItem = product => {
  return async dispatch => {
    try {
      await axios.delete('/api/cart', {data: {id: product.id}})
      dispatch(deleteItem(product))
    } catch (err) {
      console.log('trouble removing item from cart')
    }
  }
}

export const updateProductQuantity = item => {
  return async dispatch => {
    try {
      const {data} = await axios.put('/api/cart', item)
      dispatch(updateItemQuantity(data))
    } catch (err) {
      console.log('could not update product quantity for this order')
    }
  }
}

function cart(state = [], action) {
  switch (action.type) {
    case GET_ORDER_PRODUCTS:
      return action.products
    case ADD_PRODUCT:
      return state.map(product => {
        if (
          product.id === action.addedProducts.productId ||
          product.id === action.addedProducts.id
        ) {
          return action.addedProducts
        } else {
          return product
        }
      })
    case UPDATE_ITEM_QUANTITY:
      return state.map(product => {
        if (
          product.id === action.itemQuantityUpdated.productId ||
          product.productId === action.itemQuantityUpdated.productId ||
          product.id === action.itemQuantityUpdated.id ||
          product.id === action.itemQuantityUpdated.id
        ) {
          return action.itemQuantityUpdated
        } else {
          return product
        }
      })
    case DELETE_ITEM:
      return state.filter(product => product.id !== action.productId)
    default:
      return state
  }
}

export default cart
