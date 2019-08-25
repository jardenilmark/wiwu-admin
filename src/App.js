import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthDetails } from './actions/user/setAuthDetails.action'
import { Spin, Icon } from 'antd'
import { auth } from './firebase'
import 'antd/dist/antd.css'
import './App.css'

import AuthRoute from './components/routes/AuthRoute'
import PrivateRoute from './components/routes/PrivateRoute'
import AdminPage from './components/AdminPage'

const App = () => {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.user.loading)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(setAuthDetails(user, false, true))
      } else {
        dispatch(setAuthDetails(user, false, false))
      }
    })
  })

  if (loading) {
    return (
      <div style={styles.spinnerWrapper}>
        <Spin
          indicator={<Icon type='loading' style={styles.indicator} spin />}
          tip={<b style={styles.tip}>Please wait for a while...</b>}
        />
      </div>
    )
  }

  return (
    <div className='App'>
      <PrivateRoute path='/' component={AdminPage} />
      <AuthRoute path='/auth' />
    </div>
  )
}

const styles = {
  spinnerWrapper: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  indicator: {
    fontSize: 50,
    marginBottom: 20
  },
  tip: {
    fontSize: 18
  }
}

export default App
