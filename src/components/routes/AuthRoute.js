import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import UnverifiedScreen from '../auth/UnverifiedScreen'

const AuthRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(state => state.admin.current)
  const path = user.role === 'admin' ? 'manage-responders' : 'manage-contacts'
  return (
    <Route
      {...rest}
      render={props => {
        if (user && (user.role === 'admin' || user.role === 'responder')) {
          if (user.emailVerified) {
            return <Redirect to={`/admin-page/${path}`} />
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

AuthRoute.propTypes = {
  Component: PropTypes.node
}

export default AuthRoute
