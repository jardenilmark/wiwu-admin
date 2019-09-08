import React from 'react'
import { Route, Redirect } from 'react-router'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(state => state.admin.current)
  return (
    <Route
      {...rest}
      render={props => {
        return user && user.emailVerified ? (
          <Component {...props} />
        ) : (
          <Redirect to='/auth-page/sign-in' />
        )
      }}
    />
  )
}

export default PrivateRoute
