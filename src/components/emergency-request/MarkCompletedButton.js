import React from 'react'
import PropTypes from 'prop-types'
import { Button, Popconfirm, Tooltip } from 'antd'
import { updateRequest } from '../../actions/emergency-request/updateEmergency.action'
import { useDispatch } from 'react-redux'

/**
 * MARK COMPLETED
 * conditions
 * - cannot move card to completed if no assigned responder
 * - cannot move card to completed if card is not assigned to you
 * - can only move card if card is assigned and if card is assigned to u
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const MarkCompletedButton = props => {
  const dispatch = useDispatch()
  const { request, user } = props

  const isMarkCompletedDisabled =
    !request.responderId ||
    (request.responderId && request.responderId.id !== user.uid)

  const getMarkCompletedDisabledTooltip = () => {
    if (request.responderId && request.responderId.id !== user.uid) {
      return 'Unable to move. This card is not assigned to you!'
    } else if (!request.responderId) {
      return 'Unable to move unassigned cards'
    } else {
      return 'Move card to completed'
    }
  }
  return (
    <Popconfirm
      disabled={isMarkCompletedDisabled}
      title='Are you sure to mark this completed?'
      okText='Yes'
      cancelText='No'
      onConfirm={() =>
        dispatch(
          updateRequest(request.id, {
            status: 'COMPLETED'
          })
        )
      }>
      <Tooltip
        key={'move-to-completed'}
        title={getMarkCompletedDisabledTooltip}>
        <Button icon={'arrow-right'} disabled={isMarkCompletedDisabled} />
      </Tooltip>
    </Popconfirm>
  )
}

MarkCompletedButton.propTypes = {
  request: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default MarkCompletedButton
