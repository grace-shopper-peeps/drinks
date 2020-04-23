import React from 'react'

export class ProductReviews extends React.Component {
  render() {
    let reviewList = this.props.reviews
    return (
      <div>
        {reviewList.map(review => {
          if (review.productId === this.props.productId) {
            return <div key={review.id}>{review.title}</div>
          }
        })}
      </div>
    )
  }
}
