import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthDetails } from './actions/admin/setAuthDetails.action'
import { auth } from './firebase'
import 'antd/dist/antd.css'
import './App.css'

import AuthRoute from './components/routes/AuthRoute'
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
      <AuthRoute exact path='/auth/signIn' />
      <AuthRoute exact path='/auth/signUp' />
      <AdminPage />
    </div>
  )
}

export default App
