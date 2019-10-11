import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { List, Avatar, Tag, Popconfirm, Tooltip, Icon } from 'antd'
import { getTagColor } from '../../helpers/common/getTagColor'
import { toggleEditModal } from '../../actions/responder/toggleEditModal.action'
import { setSelectedResponder } from '../../actions/responder/setSelectedResponder.action'
import { changeResponderStatus } from '../../actions/responder/changeResponderStatus.action'
import { statuses } from '../../constants/User'
import _ from 'lodash'

const ResponderListItem = ({ responder }) => {
  const dispatch = useDispatch()
  const { status } = responder
  const color = getTagColor(responder.status)
  return (
    <List.Item
      actions={
        status === statuses.ACTIVE
          ? [
              <Tooltip
                key={'edit-responder'}
                placement='left'
                title='Edit Responder'>
                <Icon
                  type='edit'
                  style={{ fontSize: 18, color: 'green' }}
                  onClick={() => {
                    dispatch(setSelectedResponder(responder))
                    dispatch(toggleEditModal())
                  }}
                />
              </Tooltip>,
              <Tooltip
                key={'archive-responder'}
                placement='left'
                title='Archive Responder'>
                <Popconfirm
                  placement='top'
                  title='Are you sure you want to archive this responder?'
                  onConfirm={() =>
                    dispatch(
                      changeResponderStatus(responder.id, statuses.ARCHIVED)
                    )
                  }
                  okText='Yes'
                  cancelText='No'>
                  <Icon
                    type='history'
                    style={{ fontSize: 18, color: 'orange' }}
                  />
                </Popconfirm>
              </Tooltip>,
              <Tooltip
                key={'block-responder'}
                placement='left'
                title='Block Responder'>
                <Popconfirm
                  placement='top'
                  title='Are you sure you want to block this responder?'
                  onConfirm={() =>
                    dispatch(
                      changeResponderStatus(responder.id, statuses.BLOCKED)
                    )
                  }
                  okText='Yes'
                  cancelText='No'>
                  <Icon type='stop' style={{ fontSize: 18, color: 'red' }} />
                </Popconfirm>
              </Tooltip>
            ]
          : [
              <Tooltip
                key={'activate-responder'}
                placement='left'
                title='Activate Responder'>
                <Popconfirm
                  placement='top'
                  title='Are you sure you want to activate this responder?'
                  onConfirm={() =>
                    dispatch(
                      changeResponderStatus(responder.id, statuses.ACTIVE)
                    )
                  }
                  okText='Yes'
                  cancelText='No'>
                  <Icon type='undo' style={{ fontSize: 18, color: 'green' }} />
                </Popconfirm>
              </Tooltip>
            ]
      }>
      <List.Item.Meta
        avatar={
          <Avatar
            src={require('../../assets/images/user-avatar.png')}
            size={45}
          />
        }
        title={
          <b>
            {_.startCase(responder.firstName)} {responder.lastName} |{' '}
            <Tag color={color}>{responder.status.toUpperCase()}</Tag>
          </b>
        }
        description={
          <Fragment>
            <span>{responder.department}</span>
            <br />
            <span>{responder.phoneNumber}</span>
          </Fragment>
        }
      />
    </List.Item>
  )
}

ResponderListItem.propTypes = {
  responder: PropTypes.object.isRequired
}

export default ResponderListItem
