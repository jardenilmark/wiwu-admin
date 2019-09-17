import { createAction } from 'redux-actions'
import React, { useEffect } from 'react'
import { Layout } from 'antd'
import { Switch, Route } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { firestore as db } from '../firebase'
import UIfx from 'uifx'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import PrivateRoute from './routes/PrivateRoute'
import ManageResponders from './responders/ManageResponders'
import ManageUsers from './users/ManageUsers'
import ManageContacts from './contacts/ManageContacts'
import UserVerification from './users/UserVerification'
import EmergencyList from './responders/EmergencyList'
import Settings from './Settings.js'
import Sidebar from './Sidebar'
import NoMatch from './NoMatch'

import { GET_EMERGENCIES } from '../actions/emergency/emergency.constants'
import soundfile from '../assets/sounds/alert.mp3'
import { roles } from '../constants/User'

const alert = new UIfx(soundfile, {
  volume: 1, // number between 0.0 ~ 1.0
  throttleMs: 100
})

const adminRoutes = [
  { path: 'manage-responders', component: ManageResponders },
  { path: 'manage-users', component: ManageUsers },
  { path: 'manage-contacts', component: ManageContacts },
  { path: 'settings', component: Settings }
]

const responderRoutes = [
  { path: 'manage-contacts', component: ManageContacts },
  { path: 'verification', component: UserVerification },
  { path: 'emergency-list', component: EmergencyList },
  { path: 'settings', component: Settings }
]

const AdminPage = props => {
  const dispatch = useDispatch()
  const { match } = props
  const { role } = useSelector(state => state.admin.current)
  const routes = role === roles.ADMIN ? adminRoutes : responderRoutes

  toast.configure()

  useEffect(() => {
    if (role === roles.RESPONDER) {
      try {
        // placed inside so it won't reset when state is changed
        let firstRender = true
        let count = 0
        // listens for new documents and updates
        const snapshot = db
          .collection('emergencies')
          .orderBy('date')
          .startAfter(new Date().getTime())
          .onSnapshot(async e => {
            // TODO filter by department once routing is completed
            const emergencies = await Promise.all(
              e.docs.map(async emergency => {
                const userRef = await emergency.data().userId.get()

                const { firstName, lastName, phoneNumber } = userRef.data()

                return {
                  ...emergency.data(),
                  id: emergency.id,
                  name: `${firstName} ${lastName}`,
                  phoneNumber
                }
              })
            )

            dispatch(createAction(GET_EMERGENCIES)(emergencies))

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
    }
  }, [])

  return (
    <Layout style={styles.layout}>
      <Sidebar {...props} />
      <Layout>
        <Switch>
          {routes.map(({ path, component: Component }, index) => (
            <PrivateRoute
              key={index}
              path={`${match.url}/${path}`}
              component={Component}
            />
          ))}
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
