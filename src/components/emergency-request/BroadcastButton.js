import { Button, Icon, Popconfirm, Tooltip } from 'antd'
import { broadcastNotification } from '../../helpers/common/broadcastNotification.helper'
import React from 'react'
import PropTypes from 'prop-types'

/**
 * * BROADCAST EMERGENCY
 * conditions:
 * - cannot broadcast emergency if completed
 * - cannot broadcast emergency if marked as spam
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const BroadcastButton = props => {
  const { request } = props

  const isBroadcastEmergencyDisabled =
    request.status === 'COMPLETED' || request.isMarkedSpam

  return (
    <Tooltip title='Broadcast emergency'>
      <Popconfirm
        disabled={isBroadcastEmergencyDisabled}
        title={'Are you sure to broadcast this emergency?'}
        okText={'Yes'}
        cancelText='No'
        onConfirm={() =>
          broadcastNotification('An emergency is near your area!', [
            {
              field: 'location',
              radius: '1000', // within 1000 meters
              lat: request.location.latitude,
              long: request.location.longitude
            }
          ])
        }>
        <Button
          size={'small'}
          type={'link'}
          disabled={isBroadcastEmergencyDisabled}>
          <Icon type='global' />
        </Button>
      </Popconfirm>
    </Tooltip>
  )
}

BroadcastButton.propTypes = {
  request: PropTypes.object.isRequired
}

export default BroadcastButton
