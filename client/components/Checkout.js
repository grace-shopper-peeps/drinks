import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

export default class Checkout extends React.Component {
  // make an axios request
  // make request to change the status
  // show user success or fail page

  onToken = async token => {
    try {
      token.orderId = this.props.cart[0].throughProductOrders.orderId
      const {status} = await axios.post('/api/stripe', {token})
      //pass in the order to backend so you can update the status from cart to complete or whatever
      if (status === 200) {
        //this means order successfully went through
        // do something, maybe show user a message that says success or whatever
      } else {
        // say there was an error
      }
    } catch (err) {
      console.log(err)
    }
  }
  // onToken = (token) => {

  //   fetch('/api/stripe', {
  //     method: 'POST',
  //     body: JSON.stringify(token),
  //   }).then((res) => {
  //     res.json().then((data) => {
  //       alert(`We are in business, ${data.email}`)
  //     })
  //   })
  // }

  // ...

  render() {
    return (
      <div>
        {this.props.cart[0] ? (
          // ...
          <StripeCheckout
            name="INSERT LATER" // the pop-in header title
            description="An unparalleled cocktail experience" // the pop-in header subtitle
            orderId={this.props.cart[0].throughProductOrders.orderId}
            token={this.onToken}
            stripeKey="pk_test_AqTzNNToEijqjx9ZOGUiqI7q00xE0x9PfI"
          />
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    )
  }
}
