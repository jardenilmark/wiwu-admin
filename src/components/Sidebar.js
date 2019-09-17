import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Icon } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { signOut } from '../actions/admin/signOut.action'
import { getActiveKey } from '../helpers/common/getActiveKey'
import { roles } from '../constants/User'

import Logo from './Logo'

const adminMenuItems = [
  { key: 'manage-responders', icon: 'safety', title: 'Manage Responders' },
  { key: 'manage-users', icon: 'team', title: 'Manage Users' },
  { key: 'manage-contacts', icon: 'phone', title: 'Manage Contacts' },
  { key: 'settings', icon: 'user', title: 'User Settings' }
]

const responderMenuItems = [
  { key: 'manage-contacts', icon: 'phone', title: 'Manage Contacts' },
  { key: 'verification', icon: 'check-circle', title: 'User Verification' },
  { key: 'emergency-list', icon: 'alert', title: 'Emergency List' },
  { key: 'settings', icon: 'user', title: 'Settings' }
]

const Sidebar = ({ history, location, match }) => {
  const dispatch = useDispatch()
  const { role } = useSelector(state => state.admin.current)
  const menuItems = role === roles.ADMIN ? adminMenuItems : responderMenuItems
  const [collapsed, toggleCollapse] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState([getActiveKey(location)])

  return (
    <Layout.Sider
      collapsible
      width={220}
      collapsed={collapsed}
      onCollapse={() => toggleCollapse(!collapsed)}>
      <div style={styles.logoWrapper}>
        <Logo height={70} />
      </div>
      <Menu
        theme='dark'
        mode='inline'
        style={styles.menu}
        selectedKeys={selectedKeys || null}>
        {menuItems.map(({ key, icon, title }) => (
          <Menu.Item
            key={key}
            onClick={() => {
              history.push(`${match.url}/${key}`)
              setSelectedKeys([key])
            }}>
            <Icon type={icon} />
            <span>{title}</span>
          </Menu.Item>
        ))}
        <Menu.Item key='logout' onClick={() => dispatch(signOut())}>
          <Icon type='poweroff' />
          <span>Logout</span>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  )
}

Sidebar.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

const styles = {
  logoWrapper: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    margin: '25px 0px 15px 0px'
  },
  menu: {
    textAlign: 'left'
  }
}

export default Sidebar
