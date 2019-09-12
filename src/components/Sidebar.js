import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Icon } from 'antd'
import { useDispatch } from 'react-redux'

import { signOut } from '../actions/admin/signOut.action'
import { getActiveKey } from '../helpers/common/getActiveKey'

import Logo from './Logo'

const Sidebar = ({ history, location, match }) => {
  const dispatch = useDispatch()
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
        <Menu.Item
          key='manage-responders'
          onClick={() => {
            history.push(`${match.url}/manage-responders`)
            setSelectedKeys(['manage-responders'])
          }}>
          <Icon type='alert' />
          <span>Manage Responders</span>
        </Menu.Item>
        <Menu.Item
          key='manage-users'
          onClick={() => {
            history.push(`${match.url}/manage-users`)
            setSelectedKeys(['manage-users'])
          }}>
          <Icon type='team' />
          <span>Manage Users</span>
        </Menu.Item>
        <Menu.Item
          key='manage-contacts'
          onClick={() => {
            history.push(`${match.url}/manage-contacts`)
            setSelectedKeys(['manage-contacts'])
          }}>
          <Icon type='phone' />
          <span>Manage Contacts</span>
        </Menu.Item>
        <Menu.Item
          key='emergency-list'
          onClick={() => {
            history.push(`${match.url}/emergency-list`)
            setSelectedKeys(['emergency-list'])
          }}>
          <Icon type='alert' />
          <span>Emergency List</span>
        </Menu.Item>
        <Menu.Item
          key='verification'
          onClick={() => {
            history.push(`${match.url}/verification`)
            setSelectedKeys(['verification'])
          }}>
          <Icon type='check-circle' />
          <span>User Verification</span>
        </Menu.Item>
        <Menu.Item
          key='settings'
          onClick={() => {
            history.push(`${match.url}/settings`)
            setSelectedKeys(['settings'])
          }}>
          <Icon type='setting' />
          <span>Settings</span>
        </Menu.Item>
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
