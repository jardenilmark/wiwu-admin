import _ from 'lodash'
import { createAction } from 'redux-actions'
import React, { useEffect } from 'react'
import { Layout } from 'antd'
import { Switch, Route } from 'react-router'
import { useDispatch } from 'react-redux'

import PrivateRoute from './routes/PrivateRoute'
import ManageResponders from './responders/ManageResponders'
import ManageUsers from './users/ManageUsers'
import ManageContacts from './contacts/ManageContacts'
import UserVerification from './users/UserVerification'
import EmergencyList from './responders/EmergencyList'
import AdminSettings from './AdminSettings.js'
import Sidebar from './Sidebar'
import NoMatch from './NoMatch'

import { firestore as db } from '../firebase'

import { GET_EMERGENCIES } from '../actions/emergency/emergency.constants'

const AdminPage = props => {
  const { match } = props
  const dispatch = useDispatch()

  useEffect(() => {
    try {
      // listens for new documents and updates
      const snapshot = db
        .collection('emergencies')
        .orderBy('date')
        .startAfter(new Date().getTime())
        .onSnapshot(e => {
          // TODO filter by department once routing is completed
          const data = _.reverse(
            e.docs.map(e => {
              return {
                ...e.data(),
                id: e.id
              }
            })
          )
          dispatch(createAction(GET_EMERGENCIES)(data))
        })

      return function cleanup() {
        snapshot()
      }
    } catch (e) {
      console.log(e)
    }
  }, [])

  return (
    <Layout style={styles.layout}>
      <Sidebar {...props} />
      <Layout>
        <Switch>
          <PrivateRoute
            path={`${match.url}/manage-responders`}
            component={ManageResponders}
          />
          <PrivateRoute
            path={`${match.url}/emergency-list`}
            component={EmergencyList}
          />
          <PrivateRoute
            path={`${match.url}/manage-users`}
            component={ManageUsers}
          />
          <PrivateRoute
            path={`${match.url}/manage-contacts`}
            component={ManageContacts}
          />
          <PrivateRoute
            path={`${match.url}/verification`}
            component={UserVerification}
          />
          <PrivateRoute
            path={`${match.url}/settings`}
            component={AdminSettings}
          />
          <Route component={NoMatch} />
        </Switch>
        <Layout.Footer style={styles.footer}>
          wiwu-admin ©2019 created by timwiwu
        </Layout.Footer>
      </Layout>
    </Layout>
  )
}

const styles = {
  layout: {
    height: '100vh'
  },
  footer: {
    textAlign: 'center'
  }
}

export default AdminPage
