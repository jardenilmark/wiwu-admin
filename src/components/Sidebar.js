import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { logout } from '../actions/user/logout.action'
import { toggleSiderCollapse } from '../actions/layout/toggleSiderCollapse.action'
import Logo from './Logo'
import { useDispatch, useSelector } from 'react-redux'

const Sidebar = ({ history, location }) => {
  const dispatch = useDispatch()
  const pathname = location.pathname.split('/')[1]
  const selectedKeys = pathname === '' ? ['dashboard'] : [pathname]
  const collapsed = useSelector(state => state.layout.collapsed)

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => dispatch(toggleSiderCollapse())}>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          margin: '35px 0px 20px 0px'
        }}>
        <Logo height={70} />
      </div>
      <Menu
        theme='dark'
        mode='inline'
        style={{ textAlign: 'left' }}
        selectedKeys={selectedKeys}>
        <Menu.Item
          key='manage-responders'
          onClick={() => history.push('/manage-responders')}>
          <Icon type='safety' />
          <span>Manage Responders</span>
        </Menu.Item>
        <Menu.Item
          key='manage-users'
          onClick={() => history.push('/manage-users')}>
          <Icon type='team' />
          <span>Manage Users</span>
        </Menu.Item>
        <Menu.Item
          key='verification'
          onClick={() => history.push('/verification')}>
          <Icon type='check-circle' />
          <span>Verification</span>
        </Menu.Item>
        <Menu.Item key='settings' onClick={() => history.push('/settings')}>
          <Icon type='setting' />
          <span>Settings</span>
        </Menu.Item>
        <Menu.Item key='logout' onClick={() => dispatch(logout())}>
          <Icon type='poweroff' />
          <span>Logout</span>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  )
}

export default Sidebar
