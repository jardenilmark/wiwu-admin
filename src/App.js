import React from 'react'
import { Route } from 'react-router-dom'
import Login from './components/LoginScreen'
import SignUp from './components/SignUpScreen'
import './App.css'
import 'antd/dist/antd.css'

const App = () => {
  return (
    <div className='App'>
      <Route path='/' exact component={Login} />
      <Route path='/signUp' exact component={SignUp} />
    </div>
  )
}

export default App
