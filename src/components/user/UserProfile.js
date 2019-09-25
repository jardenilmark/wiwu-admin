import React from 'react'
import { Drawer, Typography, Avatar, Divider, Empty } from 'antd'

import Map from '../Map'

import avatarPlaceholder from '../../assets/images/user-avatar.png'

const { Text } = Typography

const UserProfile = ({ user, drawerVisibility, setDrawerVisibility }) => {
  console.log(user)
  return (
    <Drawer
      title={<b>User Profile</b>}
      width={550}
      destroyOnClose={true}
      maskClosable={false}
      keyboard={false}
      bodyStyle={{ background: '#f5f5f5', height: '94%' }}
      onClose={() => setDrawerVisibility(false)}
      visible={drawerVisibility}>
      <div style={{ textAlign: 'center' }}>
        <Avatar
          src={user.avatar || avatarPlaceholder}
          size={150}
          shape='square'
        />
        <br />
        <Text strong style={{ fontSize: 25 }}>
          {user.firstName} {user.lastName}
        </Text>
        <br />
        <Text strong>{user.phoneNumber}</Text>
      </div>
      <Divider />
      <Text strong mark>
        Emergency Requests:
      </Text>
      <br />
      <br />
      <Empty
        description={'This user has not made any emergency request yet.'}
      />
      <Divider />
      <Text strong mark>
        Home Location:
      </Text>
      <br />
      <br />
      <Map
        location={user.homeCoordinates}
        style={{ width: '100%', height: '250px' }}
      />
    </Drawer>
  )
}

export default UserProfile
