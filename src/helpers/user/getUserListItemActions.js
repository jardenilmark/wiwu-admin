import React from 'react'
import { Icon, Tooltip, Popconfirm, Modal, Typography } from 'antd'

import Map from '../../components/Map'

import { changeUserStatus } from '../../actions/user/changeUserStatus.action'
import { statuses } from '../../constants/User'

const { Text } = Typography

export const getUserListItemActions = (user, dispatch) => {
  const activeUserActions = [
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
                <br />
                <Text type='secondary'>{user.address}</Text>
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
    </Tooltip>
  ]

  const archivedUserActions = [
    <Tooltip placement='left' title='Restore User'>
      <Popconfirm
        placement='top'
        title='Are you sure you want to restore this user?'
        onConfirm={() => dispatch(changeUserStatus(user.id, statuses.ACTIVE))}
        okText='Yes'
        cancelText='No'>
        <Icon type='history' style={{ fontSize: 18 }} />
      </Popconfirm>
    </Tooltip>
  ]

  switch (user.status) {
    case statuses.ACTIVE:
      return activeUserActions
    case statuses.ARCHIVED:
      return archivedUserActions
    default:
      return []
  }
}
