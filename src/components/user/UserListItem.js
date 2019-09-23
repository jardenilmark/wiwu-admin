import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { List, Avatar, Tag } from 'antd'

import { getUserListItemActions } from '../../helpers/user/getUserListItemActions'
import { getTagColor } from '../../helpers/common/getTagColor'
import avatarPlaceholder from '../../assets/images/user-avatar.png'

const UserListItem = ({ user }) => {
  const dispatch = useDispatch()
  const color = getTagColor(user.status)
  const actions = getUserListItemActions(user, dispatch)
  return (
    <List.Item actions={actions}>
      <List.Item.Meta
        avatar={<Avatar src={user.avatar || avatarPlaceholder} size={45} />}
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
  )
}

UserListItem.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserListItem
