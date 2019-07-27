import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './App.css'
import 'antd/dist/antd.css'

import Dashboard from './components/Dashboard'
import AuthScreen from './components/auth/AuthScreen'

const App = () => {
  const isLoggedIn = useSelector(state => state.user.current)
  return (
    <div className='App'>
      <Route path='/auth' component={AuthScreen} />
      <Route
        path='/'
        exact
        render={() => (isLoggedIn ? <Redirect to='/auth' /> : <Dashboard />)}
      />
    </div>
  )
}

export default App
