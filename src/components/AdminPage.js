import _ from 'lodash'
import { createAction } from 'redux-actions'
import React, { useEffect } from 'react'
import { Layout } from 'antd'
import { Switch, Route } from 'react-router'
import { useDispatch } from 'react-redux'
import UIfx from 'uifx'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import soundfile from '../assets/sounds/alert.mp3'

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

const alert = new UIfx(soundfile, {
  volume: 1, // number between 0.0 ~ 1.0
  throttleMs: 100
})

const AdminPage = props => {
  const { match } = props

  const dispatch = useDispatch()

  toast.configure()

  useEffect(() => {
    try {
      // placed inside so it won't reset when state is changed
      let firstRender = true
      let count = 0
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

          e.docChanges().forEach(change => {
            if (change.type === 'added') {
              if (!firstRender) {
                count += 1

                toast(`New emergency has been added! ${count}`, {
                  type: 'error',
                  position: 'bottom-right',
                  onClose: () => {
                    count = 0
                  }
                })
                alert.play()
              }
            }
          })

          firstRender = false
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
