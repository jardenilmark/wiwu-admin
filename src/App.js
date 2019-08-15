import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthDetails } from './actions/user/setAuthDetails.action'
import { auth } from './firebase'
import 'antd/dist/antd.css'
import './App.css'

import AuthRoute from './components/routes/AuthRoute'
import PrivateRoute from './components/routes/PrivateRoute'
import Dashboard from './components/Dashboard'

const App = () => {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.user.loading)
  const authenticated = useSelector(state => state.user.authenticated)
  const current = useSelector(state => state.user.current)

  useEffect(() => {
    const observer = auth.onAuthStateChanged(user => {
      /* 
        setAuthDetails(user, loading, authenticated)
      */
      if (user) {
        dispatch(setAuthDetails(user, false, true))
      } else {
        dispatch(setAuthDetails(user, false, false))
      }
    })

    return () => {
      /* 
        clean up subscriptions when component unmounts
      */
      observer()
    }
  })

  /* 
    TODO: Temporary 'Loading...' is displayed while waiting for the
          data from firebase and update the state
  */
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='App'>
      <PrivateRoute
        exact
        path='/'
        component={Dashboard}
        authenticated={authenticated}
        user={current}
      />
      <AuthRoute path='/auth' authenticated={authenticated} user={current} />
    </div>
  )
}

export default App
