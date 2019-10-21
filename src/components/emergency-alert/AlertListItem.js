import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Tooltip, List, Icon, Popconfirm, Tag, Avatar } from 'antd'

import { getTagColor } from '../../helpers/common/getTagColor.helper'

import { updateEmergencyAlert } from '../../actions/emergency-alert/updateEmergencyAlert.action'
import { deleteEmergencyAlert } from '../../actions/emergency-alert/deleteEmergencyAlert.action'

const EmergencyAlertListItem = ({
  alert,
  setSelectedAlert,
  setDrawerVisibility
}) => {
  const dispatch = useDispatch()
  const color = getTagColor(alert.status)

  return (
    <List.Item
      actions={[
        // EDIT ALERT
        <Tooltip key={'edit-alert'} placement='left' title='Edit Alert'>
          <Icon
            type='edit'
            style={{ fontSize: 18 }}
            onClick={() => {
              setSelectedAlert(alert)
              setDrawerVisibility(true)
            }}
          />
        </Tooltip>,

        // ARCHIVE ALERT
        <Tooltip
          key={'delete-alert'}
          placement='left'
          title={`${alert.status === 'archived' ? 'Una' : 'A'}rchive Alert`}>
          <Popconfirm
            placement='top'
            title={`Are you sure you want to ${
              alert.status === 'archived' ? 'un' : ''
            }archive this alert?`}
            okText='Yes'
            onConfirm={() =>
              dispatch(
                updateEmergencyAlert(alert.id, {
                  status: alert.status === 'archived' ? 'active' : 'archived'
                })
              )
            }
            cancelText='No'>
            <Icon
              type={alert.status === 'archived' ? 'undo' : 'history'}
              style={{
                fontSize: 18,
                color: alert.status === 'archived' ? 'green' : 'orange'
              }}
            />
          </Popconfirm>
        </Tooltip>,

        // PERMANENTLY DELETE
        <Tooltip
          key={'permanently-delete-alert'}
          placement='left'
          title={`Permanently delete`}>
          <Popconfirm
            placement='top'
            title={`Are you sure you want to permanently delete this alert?`}
            okText='Yes'
            cancelText='No'
            onConfirm={() => dispatch(deleteEmergencyAlert(alert.id))}>
            <Icon type={'delete'} style={{ fontSize: 18, color: 'red' }} />
          </Popconfirm>
        </Tooltip>
      ]}>
      <List.Item.Meta
        avatar={
          <Avatar
            src={require(`../../assets/images/wiwu-logo.png`)}
            size={45}
          />
        }
        title={<b>{alert.message}</b>}
        description={
          <>
            <Tag color={color}>{alert.status.toUpperCase()}</Tag>
            <span>
              {moment(alert.date.toDate()).format('MMM DD, YYYY - hh:mmA')}
            </span>
          </>
        }
      />
    </List.Item>
  )
}

EmergencyAlertListItem.propTypes = {
  alert: PropTypes.object.isRequired,
  setDrawerVisibility: PropTypes.func.isRequired,
  setSelectedAlert: PropTypes.func.isRequired
}

export default EmergencyAlertListItem
