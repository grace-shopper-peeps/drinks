import React from 'react'
import {connect} from 'react-redux'
import {getAllOrders} from '../store/orders'

class OrderList extends React.Component {
  componentDidMount() {
    this.props.allOrderList()
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Orders:</h1>
        <ul>
          {this.props.orders ? (
            this.props.orders.map(order => {
              return (
                <li key={order.id}>
                  <div>
                    <h3>User: {order.user.email}</h3>
                    <div>Status: {order.status}</div>
                  </div>
                </li>
              )
            })
          ) : (
            <h1>Loading...</h1>
          )}
        </ul>
      </div>
    )
  }
}

const mapState = state => {
  return {
    orders: state.orders
  }
}

const mapDispatch = dispatch => ({
  allOrderList: () => dispatch(getAllOrders())
})

export default connect(mapState, mapDispatch)(OrderList)
