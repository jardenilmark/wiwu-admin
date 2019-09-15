import React from 'react'
import { Icon, Tooltip, Popconfirm, Modal, Typography } from 'antd'

import Map from '../../components/Map'

import { changeUserStatus } from '../../actions/user/changeUserStatus.action'
import { statuses } from '../../constants/User'

const { Text } = Typography

export const getUserListItemActions = (user, dispatch) => {
  const activeUserActions = [
    <Tooltip placement='left' title='Show Location'>
      <Icon
        type='environment'
        style={{ fontSize: 18 }}
        onClick={() => {
          Modal.info({
            title: (
              <div>
                <Text strong>
                  {user.firstName} {user.lastName}{' '}
                </Text>
              </div>
            ),
            width: 660,
            icon: null,
            keyboard: false,
            maskClosable: false,
            okText: 'Close',
            okType: 'danger',
            content: <Map location={user.homeCoordinates} />
          })
        }}
      />
    </Tooltip>,
    <Tooltip placement='left' title='Archive User'>
      <Popconfirm
        placement='top'
        title='Are you sure you want to archive this user?'
        onConfirm={() => dispatch(changeUserStatus(user.id, statuses.ARCHIVED))}
        okText='Yes'
        cancelText='No'>
        <Icon type='history' style={{ fontSize: 18 }} />
      </Popconfirm>
    </Tooltip>,
    <Tooltip placement='left' title='Block User'>
      <Popconfirm
        placement='top'
        title='Are you sure you want to block this user?'
        onConfirm={() => dispatch(changeUserStatus(user.id, statuses.BLOCKED))}
        okText='Yes'
        cancelText='No'>
        <Icon type='stop' style={{ fontSize: 18 }} />
      </Popconfirm>
    </Tooltip>
  ]

  const inactiveUserActions = [
    <Tooltip placement='left' title='Activate User'>
      <Popconfirm
        placement='top'
        title='Are you sure you want to activate this user?'
        onConfirm={() => dispatch(changeUserStatus(user.id, statuses.ACTIVE))}
        okText='Yes'
        cancelText='No'>
        <Icon type='undo' style={{ fontSize: 18 }} />
      </Popconfirm>
    </Tooltip>
  ]

  switch (user.status) {
    case statuses.ACTIVE:
      return activeUserActions
    case statuses.ARCHIVED:
      return inactiveUserActions
    case statuses.BLOCKED:
      return inactiveUserActions
    default:
      return []
  }
}
