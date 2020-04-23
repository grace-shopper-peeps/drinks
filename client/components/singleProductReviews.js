import React from 'react'

export class ProductReviews extends React.Component {
  render() {
    let reviewList = this.props.reviews
    return (
      <div>
        {reviewList.map(review => {
          if (review.productId === this.props.productId) {
            return (
              <div key={review.id}>
                <h4>{review.title}</h4>
                <h5>Rating: {review.rating}</h5>
                <p>{review.text}</p>
              </div>
            )
          }
        })}
      </div>
    )
  }
}
