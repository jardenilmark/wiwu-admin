import { Button, Icon, Popconfirm, Tooltip } from 'antd'
import { updateRequest } from '../../actions/emergency-request/updateEmergency.action'
import { firestore } from '../../firebase'
import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

/**
 * ASSIGN TO ME
 * conditions:
 * - cannot assign to me if card is already assigned
 * - cannot assign to me if card is marked as spam
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const AssignToMeButton = props => {
  const dispatch = useDispatch()
  const { request, user } = props

  const isAssignToMeDisabled = request.responderId || request.isMarkedSpam

  const getAssignToMeDisabledTooltip = () => {
    if (request.responderId) {
      return 'Request already assigned'
    } else if (request.isMarkedSpam) {
      return 'Cannot assign, already marked as spam!'
    } else {
      return 'Assign to me'
    }
  }

  return (
    <Tooltip title={getAssignToMeDisabledTooltip}>
      <Popconfirm
        disabled={isAssignToMeDisabled}
        title='Assign this request to yourself?'
        okText='Yes'
        cancelText='No'
        onConfirm={() =>
          dispatch(
            updateRequest(request.id, {
              responderId: firestore.doc(`users/${user.uid}`)
            })
          )
        }>
        <Button
          disabled={isAssignToMeDisabled}
          size={'small'}
          type={'link'}
          style={{
            color: isAssignToMeDisabled ? 'grey' : 'green'
          }}>
          <Icon type='user-add' />
        </Button>
      </Popconfirm>
    </Tooltip>
  )
}

AssignToMeButton.propTypes = {
  request: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default AssignToMeButton
