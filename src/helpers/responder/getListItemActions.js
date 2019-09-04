import React from 'react'
import { Icon, Tooltip, Popconfirm } from 'antd'

import { toggleEditModal } from '../../actions/responder/toggleEditModal.action'
import { setClickedResponder } from '../../actions/responder/setClickedResponder.action'
import { changeResponderStatus } from '../../actions/responder/changeResponderStatus.action'
import { statuses } from '../../constants/User'

export const getListItemActions = (responder, dispatch) => {
  const activeResponderActions = [
    <Tooltip placement='left' title='Edit Responder'>
      <Icon
        type='edit'
        style={{ fontSize: 18 }}
        onClick={() => {
          dispatch(setClickedResponder(responder))
          dispatch(toggleEditModal())
        }}
      />
    </Tooltip>,
    <Tooltip placement='left' title='Archive Responder'>
      <Popconfirm
        placement='top'
        title='Are you sure you want to archive this responder?'
        onConfirm={() =>
          dispatch(changeResponderStatus(responder.id, statuses.ARCHIVED))
        }
        okText='Yes'
        cancelText='No'>
        <Icon type='history' style={{ fontSize: 18 }} />
      </Popconfirm>
    </Tooltip>
  ]

  const archivedResponderActions = [
    <Tooltip placement='left' title='Restore Responder'>
      <Popconfirm
        placement='top'
        title='Are you sure you want to restore this responder?'
        onConfirm={() =>
          dispatch(changeResponderStatus(responder.id, statuses.ACTIVE))
        }
        okText='Yes'
        cancelText='No'>
        <Icon type='history' style={{ fontSize: 18 }} />
      </Popconfirm>
    </Tooltip>
  ]

  switch (responder.status) {
    case statuses.ACTIVE:
      return activeResponderActions
    case statuses.ARCHIVED:
      return archivedResponderActions
    default:
      return []
  }
}
