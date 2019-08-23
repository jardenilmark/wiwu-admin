import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthDetails } from './actions/user/setAuthDetails.action'
import { Switch } from 'react-router'
import { auth } from './firebase'
import 'antd/dist/antd.css'
import './App.css'

import AuthRoute from './components/routes/AuthRoute'
import PrivateRoute from './components/routes/PrivateRoute'
import ManageResponders from './components/responders/RespondersScreen'
import VideoVerification from './components/VideoVerification'

const App = () => {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.user.loading)
  const authenticated = useSelector(state => state.user.authenticated)
  const current = useSelector(state => state.user.current)

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
    return <div>Loading...</div>
  }

  return (
    <div className='App'>
      {/* <Switch> */}
      <PrivateRoute
        path='/manage-responders'
        component={ManageResponders}
        authenticated={authenticated}
        user={current}
      />
      <PrivateRoute
        path='/verification'
        component={VideoVerification}
        authenticated={authenticated}
        user={current}
      />
      {/* </Switch> */}
      <AuthRoute path='/auth' authenticated={authenticated} user={current} />
    </div>
  )
}

export default App
