export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_CREATED: 'SHOW_CREATED',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_CANCELLED: 'SHOW_CANCELLED',
  SHOW_PROCESSING: 'SHOW_PROCESSING'
}

export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter
})

const initialState = VisibilityFilters.SHOW_ALL

const visibilityReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

export default visibilityReducer
