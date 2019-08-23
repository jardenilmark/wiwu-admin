import React from 'react'
import { Route, Redirect } from 'react-router'

import AdminPage from '../AdminPage'

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
          <AdminPage {...props} component={Component} />
        ) : (
          <Redirect to='/auth' />
        )
      }
    />
  )
}

export default PrivateRoute
