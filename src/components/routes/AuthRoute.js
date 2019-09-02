import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import UnverifiedScreen from '../auth/UnverifiedScreen'

const AuthRoute = ({ component: Component, ...rest }) => {
  const authenticated = useSelector(state => state.admin.authenticated)
  const user = useSelector(state => state.admin.current)

  return (
    <Route
      {...rest}
      render={props => {
        if (!authenticated) {
          return <Component {...props} />
        } else {
          if (user && user.emailVerified) {
            return <Redirect to='/' />
          } else {
            return <UnverifiedScreen />
          }
        }
      }}
    />
  )
}

export default AuthRoute
