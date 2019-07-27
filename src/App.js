import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import 'antd/dist/antd.css'

import Dashboard from './components/Dashboard'
import AuthScreen from './components/auth/AuthScreen'
import PrivateRoute from './components/PrivateRoute'

const App = () => (
  <div className='App'>
    <PrivateRoute exact path='/' component={Dashboard} />
    <Route path='/auth' component={AuthScreen} />
  </div>
)

export default App
