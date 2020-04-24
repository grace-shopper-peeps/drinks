import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import cart from './cart'
import singleProductReducer from './product'
import allProductsReducer from './products'
import allReviewsReducer from './reviews'
import allUsersReducer from './allUsers'

const reducer = combineReducers({
  user,
  product: singleProductReducer,
  products: allProductsReducer,
  reviews: allReviewsReducer,
  cart,
  allUsersReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
