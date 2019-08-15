import React from 'react'
import { Route, Redirect } from 'react-router'

const PrivateRoute = ({
  component: Component,
  authenticated,
  user,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated && user.emailVerified ? (
          <Component {...props} />
        ) : (
          <Redirect to='/auth' />
        )
      }
    />
  )
}

export default PrivateRoute
