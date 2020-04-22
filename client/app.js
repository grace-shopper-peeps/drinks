import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {Link} from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <Link to="/products">All Products</Link>
    </div>
  )
}

export default App
