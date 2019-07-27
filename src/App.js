import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import 'antd/dist/antd.css'

import Dashboard from './components/Dashboard'
import AuthScreen from './components/auth/AuthScreen'

const App = () => {
  return (
    <div className='App'>
      <Route path='/auth' component={AuthScreen} />
      <Route path='/' exact component={Dashboard} />
    </div>
  )
}

export default App
