/* eslint-disable react/prop-types */
import { Avatar, Button, Icon, List, Tag, Tooltip } from 'antd'
import AssignToMeButton from './AssignToMeButton'
import BroadcastButton from './BroadcastButton'
import ShowInMapButton from './ShowInMapButton'
import MarkAsSpamButton from './MarkAsSpamButton'
import MarkCompletedButton from './MarkCompletedButton'
import logo from '../../assets/images/wiwu-logo.png'
import _ from 'lodash'
import moment from 'moment'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { getDepartmentTagColor } from '../../helpers/common/getDepartmentTagColor.helper'

const StyledMeta = styled(List.Item.Meta)`
  &:hover {
    cursor: pointer;
  }
`

const RequestsTab = props => {
  const {
    requests,
    user,
    title,
    setMediaModalOpen,
    setMedia,
    setRequestModalOpen,
    setRequest
  } = props

  return (
    <List
      itemLayout='horizontal'
      dataSource={requests}
      renderItem={request => {
        const tagColor = getDepartmentTagColor(request.department)

        return (
          <List.Item
            actions={[
              // VIEW MEDIA
              <Tooltip key={'view-media'} title={'View attached media'}>
                <Button
                  disabled={!request.media}
                  size={'small'}
                  type={'link'}
                  onClick={() => {
                    setMediaModalOpen(true)
                    setMedia(request.media)
                  }}>
                  <Icon type='picture' />
                </Button>
              </Tooltip>,

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
              />,

              // MARK COMPLETED
              _.upperCase(title) === 'PENDING' && (
                <MarkCompletedButton
                  key={'mark-completed'}
                  request={request}
                  user={user}
                />
              )
            ]}>
            <Tooltip title={'Click to expand request'} placement={'left'}>
              <StyledMeta
                onClick={() => {
                  setRequestModalOpen(true)
                  setRequest(request)
                }}
                avatar={<Avatar src={logo} />}
                title={
                  <div style={{ display: 'flex' }}>
                    <Tag color={tagColor}>
                      {_.upperCase(request.department)}
                    </Tag>
                    {request.responderId && (
                      <Tag color={'orange'}>ASSIGNED</Tag>
                    )}
                    <div>
                      <span style={{ fontWeight: 'bold' }}>{request.name}</span>{' '}
                      | {request.phoneNumber}
                    </div>
                  </div>
                }
                description={
                  <div>
                    <span style={{ fontWeight: 'bold' }}>{request.role}</span>
                    <span>
                      {' '}
                      -{' '}
                      {_.truncate(request.description, {
                        length: 56,
                        separator: ' '
                      }) || 'No additional description'}
                    </span>
                  </div>
                }
              />
            </Tooltip>
            <div>
              <span style={{ color: 'grey' }}>
                {moment(request.date.toDate()).format('MMM DD, YYYY - hh:mmA')}
              </span>
            </div>
          </List.Item>
        )
      }}
    />
  )
}

RequestsTab.propTypes = {
  title: PropTypes.string.isRequired,
  requests: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  setMediaModalOpen: PropTypes.func.isRequired,
  setMedia: PropTypes.func.isRequired,
  setRequestModalOpen: PropTypes.func.isRequired,
  setRequest: PropTypes.func.isRequired
}

export default RequestsTab
