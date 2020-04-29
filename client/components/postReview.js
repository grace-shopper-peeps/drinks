import React from 'react'
import {connect} from 'react-redux'
import {postReviewThunk} from '../store/reviews'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

export class PostReview extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.postReview({
      title: event.target.title.value,
      text: event.target.text.value,
      rating: event.target.rating.value
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          width="50px"
        >
          <input type="text" name="title" placeholder="Title" required={true} />
          <input
            type="text"
            name="description"
            placeholder="Let us know what you think!"
            required={true}
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            required={true}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            type="submit"
          >
            Submit
          </Button>
        </Grid>
      </form>
    )
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    postReview: review => dispatch(postReviewThunk(review))
  }
}

export default connect(null, mapDispatchToProps)(PostReview)
