import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {Route, Link} from 'react-router-dom'
import Products from './components/products'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <Link to="/products">All Products</Link>
      <Route path="/products" component={Products} />
    </div>
  )
}

export default App
