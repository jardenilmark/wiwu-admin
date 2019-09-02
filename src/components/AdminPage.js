import React from 'react'
import { Layout } from 'antd'
import { Switch } from 'react-router'

import PrivateRoute from './routes/PrivateRoute'
import ManageResponders from './responders/ManageResponders'
import ManageUsers from './users/ManageUsers'
import ManageContacts from './contacts/ManageContacts'
import VideoVerification from './VideoVerification'
import Sidebar from './Sidebar'
import NoMatch from './NoMatch'

const AdminPage = () => {
  return (
    <Layout style={styles.layout}>
      <Sidebar />
      <Layout>
        <Switch>
          <PrivateRoute exact path='/' component={ManageResponders} />
          <PrivateRoute
            path='/manage-responders'
            component={ManageResponders}
          />
          <PrivateRoute path='/manage-users' component={ManageUsers} />
          <PrivateRoute path='/manage-contacts' component={ManageContacts} />
          <PrivateRoute path='/verification' component={VideoVerification} />
          <PrivateRoute component={NoMatch} />
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
