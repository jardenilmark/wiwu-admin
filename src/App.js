import React from 'react'
import { Route } from 'react-router-dom'
import login from './components/LoginScreen'

const App = () => {
  return (
    <div className='App'>
      <Route path='/' exact component={login} />
    </div>
  )
}

export default App
