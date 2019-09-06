import React from 'react'
import { Layout } from 'antd'
import { Switch } from 'react-router'
import { Route } from 'react-router'

import PrivateRoute from './routes/PrivateRoute'
import ManageResponders from './responders/ManageResponders'
import ManageUsers from './users/ManageUsers'
import ManageContacts from './contacts/ManageContacts'
import VideoVerification from './VideoVerification'
import EmergencyList from './responders/EmergencyList'
import Sidebar from './Sidebar'
import NoMatch from './NoMatch'

const AdminPage = props => {
  const { match } = props
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
            component={VideoVerification}
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
