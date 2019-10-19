import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { List, Avatar, Badge, Tag, Icon, Popconfirm, Tooltip } from 'antd'
import ProgressiveImage from 'react-progressive-image'

import UserProfile from './UserProfile'
import Spinner from '../Spinner'

import { getTagColor } from '../../helpers/common/getTagColor.helper'
import avatarPlaceholder from '../../assets/images/user-avatar.png'

import { changeUserStatus } from '../../actions/user/changeUserStatus.action'
import { statuses } from '../../constants/User'

const UserListItem = ({ user }) => {
  const dispatch = useDispatch()
  const [drawerVisibility, setDrawerVisibility] = useState(false)
  const { status } = user
  const color = getTagColor(user.status)
  return (
    <Fragment>
      <UserProfile
        user={user}
        drawerVisibility={drawerVisibility}
        setDrawerVisibility={setDrawerVisibility}
      />
      <List.Item
        actions={
          status === statuses.ACTIVE
            ? [
                <Icon
                  type='info-circle'
                  style={{ fontSize: 18, color: 'green' }}
                  onClick={() => setDrawerVisibility(true)}
                />,
                <Tooltip placement='left' title='Archive User'>
                  <Popconfirm
                    placement='top'
                    title='Are you sure you want to archive this user?'
                    onConfirm={() =>
                      dispatch(changeUserStatus(user.id, statuses.ARCHIVED))
                    }
                    okText='Yes'
                    cancelText='No'>
                    <Icon
                      type='history'
                      style={{ fontSize: 18, color: 'orange' }}
                    />
                  </Popconfirm>
                </Tooltip>,
                <Tooltip placement='left' title='Block User'>
                  <Popconfirm
                    placement='top'
                    title='Are you sure you want to block this user?'
                    onConfirm={() =>
                      dispatch(changeUserStatus(user.id, statuses.BLOCKED))
                    }
                    okText='Yes'
                    cancelText='No'>
                    <Icon type='stop' style={{ fontSize: 18, color: 'red' }} />
                  </Popconfirm>
                </Tooltip>
              ]
            : [
                <Tooltip placement='left' title='Activate User'>
                  <Popconfirm
                    placement='top'
                    title='Are you sure you want to activate this user?'
                    onConfirm={() =>
                      dispatch(changeUserStatus(user.id, statuses.ACTIVE))
                    }
                    okText='Yes'
                    cancelText='No'>
                    <Icon
                      type='undo'
                      style={{ fontSize: 18, color: 'green' }}
                    />
                  </Popconfirm>
                </Tooltip>
              ]
        }>
        <List.Item.Meta
          avatar={
            <Badge
              count={
                user.isUserVerified ? (
                  <img
                    src='https://img.icons8.com/color/96/000000/verified-account.png'
                    alt='verified-badge'
                    height={25}
                    width={25}
                  />
                ) : (
                  0
                )
              }>
              <ProgressiveImage
                src={user.avatar ? user.avatar : avatarPlaceholder}
                placeholder='avatar'>
                {(src, loading) =>
                  loading ? (
                    <Spinner height={45} tip={''} />
                  ) : (
                    <Avatar src={src} size={45} shape='square' />
                  )
                }
              </ProgressiveImage>
            </Badge>
          }
          title={
            <b>
              {user.firstName} {user.lastName} |{' '}
              <Tag color={color}>{user.status.toUpperCase()}</Tag>
            </b>
          }
          description={
            <Fragment>
              <span>{user.phoneNumber}</span>
            </Fragment>
          }
        />
      </List.Item>
    </Fragment>
  )
}

UserListItem.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserListItem
