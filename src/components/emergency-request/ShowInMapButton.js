import { Button, Icon, Modal, Tooltip } from 'antd'
import Map from '../Map'
import React from 'react'
import PropTypes from 'prop-types'

const ShowInMapButton = props => {
  const { request } = props

  return (
    <Tooltip title='Show in map'>
      <Button
        size={'small'}
        type={'link'}
        onClick={() => {
          Modal.info({
            width: 660,
            icon: null,
            keyboard: false,
            maskClosable: false,
            okText: 'Close',
            okType: 'danger',
            content: <Map location={request.location} />
          })
        }}>
        <Icon type='environment' />
      </Button>
    </Tooltip>
  )
}

ShowInMapButton.propTypes = {
  request: PropTypes.object.isRequired
}

export default ShowInMapButton
