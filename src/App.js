import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router'

import { setCurrentUser } from './actions/admin/setCurrentUser.action'

import { auth } from './firebase'

import PrivateRoute from './components/routes/PrivateRoute'
import AuthRoute from './components/routes/AuthRoute'
import AuthPage from './components/auth/AuthPage'
import AdminPage from './components/AdminPage'
import NoMatch from './components/NoMatch'
import Spinner from './components/Spinner'

import 'antd/dist/antd.css'
import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const [loading, setLoadingStatus] = useState(true)

  useEffect(() => {
    auth.onAuthStateChanged(async user => {
      await dispatch(setCurrentUser(user))
      setLoadingStatus(false)
    })
  }, [])

  if (loading) {
    return <Spinner tip='Please wait for a while...' height={800} />
  }

  return (
    <div className='App'>
      <Switch>
        <Redirect exact from='/' to='/admin-page/manage-responders' />
        <PrivateRoute path='/admin-page' component={AdminPage} />
        <AuthRoute path='/auth-page' component={AuthPage} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  )
}

export default App
