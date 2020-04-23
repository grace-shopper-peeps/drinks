import React from 'react'
import {connect} from 'react-redux'

export class Review extends React.Component {
  render() {
    return (
      <div>
        <h3>Review title here</h3>
        <h4>Stars:</h4>
        <div>rating here</div>
        <p>Description here</p>
      </div>
    )
  }
}
