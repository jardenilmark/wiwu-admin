import React from 'react'
import PropTypes from 'prop-types'
import { Card, Col, Tag } from 'antd'
import Spacer from '../Spacer'
import _ from 'lodash'

import MarkCompletedButton from './MarkCompletedButton'
import AssignToMeButton from './AssignToMeButton'
import BroadcastButton from './BroadcastButton'
import ShowInMapButton from './ShowInMapButton'
import MarkAsSpamButton from './MarkAsSpamButton'
import { getDepartmentTagColor } from '../../helpers/common/getDepartmentTagColor.helper'
import RequestBody from './RequestBody'
import RequestMedia from './RequestMedia'

const RequestsColumn = props => {
  const {
    title,
    requests,
    user,
    setMediaModalOpen,
    setMedia,
    isSpamRequestsVisible
  } = props

  return (
    <Col span={isSpamRequestsVisible ? 8 : 12} style={{ height: '75vh' }}>
      <b>{title}</b>
      <Spacer height={16} />
      <div style={{ height: '100%', overflow: 'auto' }}>
        {requests.map(request => {
          const tagColor = getDepartmentTagColor(request.department)

          return (
            <Card
              key={request.id}
              style={{ marginBottom: '8px' }}
              size={'small'}
              title={
                <div>
                  <Tag color={tagColor}>{_.upperCase(request.department)}</Tag>
                  {request.responderId && <Tag color={'orange'}>ASSIGNED</Tag>}
                </div>
              }
              cover={
                request.media && (
                  <RequestMedia
                    media={request.media}
                    setMediaModalOpen={setMediaModalOpen}
                    setMedia={setMedia}
                    isSpamRequestsVisible={isSpamRequestsVisible}
                  />
                )
              }
              extra={
                _.upperCase(title) === 'PENDING' && (
                  // MARK COMPLETED
                  <MarkCompletedButton request={request} user={user} />
                )
              }
              actions={[
                // ASSIGN TO ME
                <AssignToMeButton
                  key={'assign-to-me'}
                  request={request}
                  user={user}
                />,

                // BROADCAST EMERGENCY
                <BroadcastButton key={'broadcast'} request={request} />,

                // SHOW EMERGENCY LOCATION
                <ShowInMapButton key={'show-location'} request={request} />,

                // MARK AS SPAM
                <MarkAsSpamButton
                  key={'mark-spam'}
                  groupTitle={title}
                  request={request}
                />
              ]}>
              <RequestBody request={request} />
            </Card>
          )
        })}
      </div>
    </Col>
  )
}

RequestsColumn.propTypes = {
  title: PropTypes.string.isRequired,
  requests: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  setMediaModalOpen: PropTypes.func.isRequired,
  setMedia: PropTypes.func.isRequired,
  isSpamRequestsVisible: PropTypes.bool.isRequired
}

export default RequestsColumn
