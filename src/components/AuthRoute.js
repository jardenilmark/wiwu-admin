import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import AuthScreen from './auth/AuthScreen'

const AuthRoute = ({ authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !authenticated ? <AuthScreen {...props} /> : <Redirect to='/' />
      }
    />
  )
}

export default AuthRoute
