import React from 'react'
import { Route, Redirect } from 'react-router'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authenticated = useSelector(state => state.user.authenticated)
  const user = useSelector(state => state.user.current)

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
