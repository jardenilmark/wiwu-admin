import React from 'react'
import Spacer from '../Spacer'
import { Card, Col, Input, Spin, Tag, Tooltip } from 'antd'
import ProgressiveImage from 'react-progressive-image'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'
import _ from 'lodash'

import MarkCompletedButton from './MarkCompletedButton'
import AssignToMeButton from './AssignToMeButton'
import BroadcastButton from './BroadcastButton'
import ShowInMapButton from './ShowInMapButton'
import MarkAsSpamButton from './MarkAsSpamButton'

const StyledImage = styled.img`
  &:hover {
    cursor: pointer;
  }
`

const StyledVideo = styled.video`
  &:hover {
    cursor: pointer;
  }
`

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
          let tagColor = ''
          if (request.department === 'police') {
            tagColor = 'red'
          } else if (request.department === 'fire') {
            tagColor = 'orange'
          } else {
            tagColor = 'blue'
          }

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
                request.media &&
                (request.media.ext === 'jpg' ? (
                  <ProgressiveImage src={request.media.url} placeholder='media'>
                    {(src, loading) =>
                      loading ? (
                        <Spin style={{ marginTop: 24 }} spinning={true} />
                      ) : (
                        <Tooltip title={'Enlarge media'}>
                          <StyledImage
                            onClick={() => {
                              setMediaModalOpen(true)
                              setMedia(request.media)
                            }}
                            height={isSpamRequestsVisible ? 100 : 200}
                            src={src}
                            alt={'media'}
                            style={{ objectFit: 'cover' }}
                          />
                        </Tooltip>
                      )
                    }
                  </ProgressiveImage>
                ) : (
                  <StyledVideo
                    onClick={() => {
                      setMediaModalOpen(true)
                      setMedia(request.media)
                    }}
                    height={isSpamRequestsVisible ? 100 : 200}
                    src={request.media.url}
                    style={{ objectFit: 'cover' }}
                  />
                ))
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
              {/* role */}
              <b>{request.role}</b>

              {/* date of request */}
              <div style={{ color: 'grey' }}>
                {moment(request.date.toDate()).format('MMM DD, YYYY - hh:mmA')}
              </div>
              <Spacer height={8} />

              {/* more info */}
              <table>
                <tbody>
                  <tr>
                    <td style={{ paddingRight: 8, fontWeight: 'bold' }}>
                      Requester:
                    </td>
                    <td>{request.name}</td>
                  </tr>
                  <tr>
                    <td style={{ paddingRight: 8, fontWeight: 'bold' }}>
                      Phone:
                    </td>
                    <td>{request.phoneNumber}</td>
                  </tr>
                  <tr>
                    <td style={{ paddingRight: 8, fontWeight: 'bold' }}>
                      Address:
                    </td>
                    <td>
                      {request.address || (
                        <Tooltip
                          placement='right'
                          title='You may need to confirm request address by calling back the requester'>
                          N / A
                        </Tooltip>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingRight: 8, fontWeight: 'bold' }}>
                      Responder:
                    </td>
                    <td>
                      {request.responderId
                        ? `${request.responderId.firstName} ${request.responderId.lastName}`
                        : 'Unassigned'}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* conditional description */}
              {request.description && (
                <>
                  <Spacer height={8} />
                  <Input.TextArea
                    style={{ color: '#606060' }}
                    value={request.description}
                    autosize={true}
                    disabled={true}
                  />
                </>
              )}
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
  setMedia: PropTypes.func.isRequired
}

export default RequestsColumn
