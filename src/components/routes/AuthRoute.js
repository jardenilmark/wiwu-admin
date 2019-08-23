import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import AuthScreen from '../auth/AuthScreen'
import VerifyScreen from '../auth/VerifyScreen'

const AuthRoute = ({ authenticated, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!authenticated) {
          return <AuthScreen {...props} />
        } else {
          if (user && user.emailVerified) {
            return <Redirect to='/manage-responders' />
          } else {
            return <VerifyScreen />
          }
        }
      }}
    />
  )
}

export default AuthRoute
