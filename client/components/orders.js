import React from 'react'
import {connect} from 'react-redux'
import {getAllOrders, setVisibilityFilter} from '../store/orders'
// import {FilterForm} from './filterForm'

class OrderList extends React.Component {
  componentDidMount() {
    this.props.allOrderList()
  }
  render() {
    return (
      <div>
        <h1>Orders:</h1>
        <button
          type="button"
          value="All"
          onClick={() => {
            this.props.allOrderList()
          }}
        >
          All
        </button>
        <button
          type="button"
          value="Created"
          onClick={() => {
            this.props.visibility(event.target.value)
          }}
        >
          Created
        </button>
        <button
          type="button"
          value="Completed"
          onClick={() => {
            this.props.visibility(event.target.value)
          }}
        >
          Completed
        </button>
        <button
          type="button"
          value="Processing"
          onClick={() => this.props.visibility(event.target.value)}
        >
          Processing
        </button>
        <button
          type="button"
          value="Cancelled"
          onClick={() => this.props.visibility(event.target.value)}
        >
          Cancelled
        </button>

        <ul>
          {this.props.orders.visibleOrders ? (
            this.props.orders.visibleOrders.map(order => {
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
  allOrderList: () => dispatch(getAllOrders()),
  visibility: filter => dispatch(setVisibilityFilter(filter))
})

export default connect(mapState, mapDispatch)(OrderList)
