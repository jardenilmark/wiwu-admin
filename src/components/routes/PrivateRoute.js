import React from 'react'
import { Route, Redirect } from 'react-router'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authenticated = useSelector(state => state.admin.authenticated)
  const user = useSelector(state => state.admin.current)

  return (
    <Route
      {...rest}
      render={props =>
        authenticated && user.emailVerified ? (
          <Component {...props} />
        ) : (
          <Redirect to='/auth/signIn' />
        )
      }
    />
  )
}

export default PrivateRoute
