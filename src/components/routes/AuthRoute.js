import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import AuthScreen from '../auth/AuthScreen'
import VerifyScreen from '../auth/VerifyScreen'

const AuthRoute = props => {
  const authenticated = useSelector(state => state.admin.authenticated)
  const user = useSelector(state => state.admin.current)

  return (
    <Route
      {...props}
      render={props => {
        if (!authenticated) {
          return <AuthScreen {...props} />
        } else {
          if (user && user.emailVerified) {
            return <Redirect to='/' />
          } else {
            return <VerifyScreen />
          }
        }
      }}
    />
  )
}

export default AuthRoute
