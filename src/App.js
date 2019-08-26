import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthDetails } from './actions/admin/setAuthDetails.action'
import { Spin, Icon } from 'antd'
import { auth } from './firebase'
import 'antd/dist/antd.css'
import './App.css'

import AuthRoute from './components/routes/AuthRoute'
import PrivateRoute from './components/routes/PrivateRoute'
import AdminPage from './components/AdminPage'
import Spinner from './components/Spinner'

const App = () => {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.admin.loading)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(setAuthDetails(user, false, true))
      } else {
        dispatch(setAuthDetails(user, false, false))
      }
    })
  })

  if (loading) {
    return <Spinner tip='Please wait for a while...' />
  }

  return (
    <div className='App'>
      <PrivateRoute path='/' component={AdminPage} />
      <AuthRoute path='/auth' />
    </div>
  )
}

export default App
