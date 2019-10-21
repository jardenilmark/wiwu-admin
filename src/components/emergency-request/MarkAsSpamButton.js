import { Button, Icon, Popconfirm, Tooltip } from 'antd'
import { updateRequest } from '../../actions/emergency-request/updateEmergency.action'
import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import _ from 'lodash'

/**
 * MARK AS SPAM
 * - cannot mark as spam if card is completed
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const MarkAsSpamButton = props => {
  const dispatch = useDispatch()
  const { request, groupTitle } = props

  const isMarkAsSpamDisabled =
    _.upperCase(groupTitle) === 'COMPLETED' && request.status === 'COMPLETED'

  return (
    <Tooltip title={request.isMarkedSpam ? 'Remove from spam' : 'Mark as spam'}>
      <Popconfirm
        disabled={isMarkAsSpamDisabled}
        title={`Are you sure to ${
          request.isMarkedSpam ? 'remove this from spam' : 'mark this as spam'
        }?`}
        okText={'Yes'}
        cancelText='No'
        onConfirm={() =>
          dispatch(
            updateRequest(request.id, {
              isMarkedSpam: !request.isMarkedSpam
            })
          )
        }>
        <Button
          size={'small'}
          type={'link'}
          disabled={isMarkAsSpamDisabled}
          style={{
            color: isMarkAsSpamDisabled ? 'grey' : 'red'
          }}>
          <Icon type={request.isMarkedSpam ? 'minus-circle' : 'warning'} />
        </Button>
      </Popconfirm>
    </Tooltip>
  )
}

MarkAsSpamButton.propTypes = {
  request: PropTypes.object.isRequired,
  groupTitle: PropTypes.string.isRequired
}

export default MarkAsSpamButton
