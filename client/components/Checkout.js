import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

export default class Checkout extends React.Component {
  // make an axios request
  // make request to change the status
  // show user success or fail page

  onToken = async token => {
    try {
      token.orderId = this.props.cart[0].throughProductOrders.orderId
      console.log(token, 'the token')
      const {status} = await axios.post('/api/stripe', {token})
      //pass in the order to backend so you can update the status from cart to complete or whatever
      if (status === 200) {
        window.location.pathname = '/thank-you'
        console.log('successssss')
      } else {
        // redirect to bad page
      }
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    console.log(location)
    return (
      <div>
        {this.props.cart[0] ? (
          // ...
          <hgroup>
            <StripeCheckout
              name="INSERT LATER" // the pop-in header title
              description="An unparalleled cocktail experience" // the pop-in header subtitle
              orderId={this.props.cart[0].throughProductOrders.orderId}
              token={this.onToken}
              stripeKey="pk_test_AqTzNNToEijqjx9ZOGUiqI7q00xE0x9PfI"
            />
          </hgroup>
        ) : (
          <h1> </h1>
        )}
      </div>
    )
  }
}
