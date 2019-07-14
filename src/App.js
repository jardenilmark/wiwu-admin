import React from 'react'
import { Route } from 'react-router-dom'

import LoginScreen from './components/LoginScreen'
import Dashboard from './components/Dashboard'

const App = () => {
  return (
    <div className='App'>
      <Route path='/login' exact component={LoginScreen} />
      <Route path='/' exact component={Dashboard} />
    </div>
  )
}

export default App
