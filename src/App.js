import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthDetails } from './actions/admin/setAuthDetails.action'
import { auth } from './firebase'
import 'antd/dist/antd.css'
import './App.css'

import AuthRoute from './components/routes/AuthRoute'
import AuthScreen from './components/auth/AuthScreen'
import AdminPage from './components/AdminPage'
import Spinner from './components/Spinner'

const App = props => {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.admin.loading)
  const authenticated = useSelector(state => state.admin.authenticated)
  const user = useSelector(state => state.admin.current)

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
      <AuthRoute path='/auth' component={AuthScreen} />
      {user && user.emailVerified && authenticated && <AdminPage />}
    </div>
  )
}

export default App
