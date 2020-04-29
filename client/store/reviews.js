import axios from 'axios'

const GET_ALL_REVIEWS = 'GET_ALL_REVIEWS'
const POST_REVIEW = 'POST_REVIEW'

const allReviews = reviews => {
  return {
    type: GET_ALL_REVIEWS,
    reviews
  }
}

const postReview = review => {
  return {
    type: POST_REVIEW,
    review
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

export const postReviewThunk = review => {
  return async dispatch => {
    try {
      let response = await axios.post('/api/reviews', review)
      let updatedRev = response.data
      dispatch(postReview(updatedRev))
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
    case POST_REVIEW:
      return [...state, action.review]
    default:
      return state
  }
}
export default allReviewsReducer
