import axios from 'axios'

const GET_ALL_REVIEWS = 'GET_ALL_REVIEWS'

const allReviews = reviews => {
  return {
    type: GET_ALL_REVIEWS,
    reviews
  }
}

export const getAllReviews = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/reviews')
      const reviews = response.data
      dispatch(allReviews(reviews))
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = []

const allReviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_REVIEWS:
      return action.reviews
    default:
      return state
  }
}
export default allReviewsReducer
