import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'
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
        <Button
          type="button"
          value="All"
          onClick={() => {
            this.props.allOrderList()
          }}
        >
          All
        </Button>
        <Button
          type="button"
          value="Created"
          onClick={() => {
            this.props.visibility(event.target.value)
          }}
        >
          Created
        </Button>
        <Button
          type="button"
          value="Completed"
          onClick={() => {
            this.props.visibility(event.target.value)
          }}
        >
          Completed
        </Button>
        <Button
          type="button"
          value="Processing"
          onClick={() => this.props.visibility(event.target.value)}
        >
          Processing
        </Button>
        <Button
          type="button"
          value="Cancelled"
          onClick={() => this.props.visibility(event.target.value)}
        >
          Cancelled
        </Button>

        <ul>
          {this.props.orders.visibleOrders ? (
            this.props.orders.visibleOrders.map(order => {
              console.log(order)
              return (
                <li key={order.id}>
                  <div>
                    <h3>Status: {order.status}</h3>
                    <div>Date Created: {order.createdAt.slice(0, 10)}</div>
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
