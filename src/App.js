import React from 'react'
import { Route } from 'react-router-dom'
import ScreenNavigation from './components/ScreenNavigation'
import './App.css'
import 'antd/dist/antd.css'

const App = () => {
  return (
    <div className='App'>
      <Route path='/' exact component={ScreenNavigation} />
      {/* <Route path='/signUp' exact component={SignUp} /> */}
    </div>
  )
}

export default App
