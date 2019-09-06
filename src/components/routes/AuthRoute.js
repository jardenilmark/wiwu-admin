import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import UnverifiedScreen from '../auth/UnverifiedScreen'

const AuthRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(state => state.admin.current)

  return (
    <Route
      {...rest}
      render={props => {
        if (user) {
          if (user.emailVerified) {
            return <Redirect to='/admin-page/manage-responders' />
          } else {
            return <UnverifiedScreen />
          }
        } else {
          return <Component {...props} />
        }
      }}
    />
  )
}

export default AuthRoute
