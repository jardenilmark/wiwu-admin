import React, { useState } from 'react'
import {
  Layout,
  Input,
  Row,
  Col,
  Card,
  Tag,
  Icon,
  Spin,
  Button,
  Tooltip,
  Popconfirm,
  Modal
} from 'antd'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import ProgressiveImage from 'react-progressive-image'
import Spacer from '../components/Spacer'
import moment from 'moment'
import _ from 'lodash'
import { updateRequest } from '../actions/emergency-request/updateEmergency.action'
import { firestore } from '../firebase'
import styled from 'styled-components'

const StyledImage = styled.img`
  &:hover {
    cursor: pointer;
  }
`

const EmergencyRequestsV2 = () => {
  const dispatch = useDispatch()
  const [isMediaModalOpen, setMediaModalOpen] = useState(false)
  const [mediaUrl, setMediaUrl] = useState(null)
  const { emergency, admin } = useSelector(state => state)
  const { list: requests } = emergency
  const {
    current: { uid }
  } = admin

  return (
    <Layout.Content style={styles.content}>
      <Helmet>
        <title>Emergency Requests v2 - wiwu admin</title>
      </Helmet>

      {/* header */}
      <div style={styles.headerWrapper}>
        <Input.Search
          placeholder='Search emergency requests...'
          style={{ width: 240 }}
        />
      </div>

      {/* list of alerts */}
      <div style={styles.listWrapper}>
        <div style={styles.list}>
          <Row gutter={16}>
            <Col span={8} style={{ height: '75vh' }}>
              <b>Pending</b>
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
                          <Tag color={tagColor}>
                            {_.upperCase(request.department)}
                          </Tag>
                          {request.responderId && (
                            <Tag color={'orange'}>ASSIGNED</Tag>
                          )}
                        </div>
                      }
                      cover={
                        request.media && (
                          <ProgressiveImage
                            src={request.media}
                            placeholder='media'>
                            {(src, loading) =>
                              loading ? (
                                <Spin
                                  style={{ marginTop: 24 }}
                                  spinning={true}
                                />
                              ) : (
                                <Tooltip title={'Enlarge media'}>
                                  <StyledImage
                                    onClick={() => {
                                      setMediaModalOpen(true)
                                      setMediaUrl(src)
                                    }}
                                    height={100}
                                    src={src}
                                    alt={'media'}
                                    style={{ objectFit: 'cover' }}
                                  />
                                </Tooltip>
                              )
                            }
                          </ProgressiveImage>
                        )
                      }
                      extra={
                        <Tooltip title='Move card to completed'>
                          <Button icon={'arrow-right'} />
                        </Tooltip>
                      }
                      actions={[
                        <Tooltip
                          key={'assign-to-me'}
                          title={
                            request.responderId
                              ? 'Request already assigned'
                              : 'Assign to me'
                          }>
                          <Popconfirm
                            title='Are you sure assign this request to yourself?'
                            okText='Yes'
                            cancelText='No'
                            onConfirm={() =>
                              dispatch(
                                updateRequest(request.id, {
                                  responderId: firestore.doc(`users/${uid}`)
                                })
                              )
                            }>
                            <Button
                              disabled={request.responderId}
                              size={'small'}
                              type={'link'}
                              style={{
                                color: request.responderId ? 'grey' : 'green'
                              }}>
                              <Icon type='user-add' />
                            </Button>
                          </Popconfirm>
                        </Tooltip>,
                        <Tooltip key={'broadcast'} title='Broadcast emergency'>
                          <Button size={'small'} type={'link'}>
                            <Icon type='global' />
                          </Button>
                        </Tooltip>,
                        <Tooltip key={'show-location'} title='Show in map'>
                          <Button size={'small'} type={'link'}>
                            <Icon type='environment' />
                          </Button>
                        </Tooltip>,
                        <Tooltip
                          key={'mark-spam'}
                          title={
                            request.isMarkedSpam
                              ? 'Already marked as spam'
                              : 'Mark as spam'
                          }>
                          <Button
                            size={'small'}
                            type={'link'}
                            disabled={request.isMarkedSpam}
                            style={{
                              color: request.isMarkedSpam ? 'grey' : 'red'
                            }}
                            onClick={() =>
                              dispatch(
                                updateRequest(request.id, {
                                  isMarkedSpam: true
                                })
                              )
                            }>
                            <Icon type='stop' />
                          </Button>
                        </Tooltip>
                      ]}>
                      <b>{request.role}</b>
                      <div style={{ color: 'grey' }}>
                        {moment(request.date.toDate()).format(
                          'MMM DD, YYYY - hh:mmA'
                        )}
                      </div>
                      <Spacer height={8} />
                      <table>
                        <tbody>
                          <tr>
                            <td style={{ paddingRight: 8 }}>Requester</td>
                            <td>{request.name}</td>
                          </tr>
                          <tr>
                            <td style={{ paddingRight: 8 }}>Phone</td>
                            <td>{request.phoneNumber}</td>
                          </tr>
                          <tr>
                            <td style={{ paddingRight: 8 }}>Address</td>
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
                            <td style={{ paddingRight: 8 }}>Responder</td>
                            <td>
                              {request.responderId
                                ? `${request.responderId.firstName} ${request.responderId.lastName}`
                                : 'Unassigned'}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      {request.description && (
                        <>
                          <Spacer height={8} />
                          <Input.TextArea
                            style={{ color: 'black' }}
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
            <Col span={8}>
              <b>Completed</b>
              <Spacer height={16} />
              <Card />
            </Col>
            <Col span={8}>
              <b>Spam</b>
              <Spacer height={16} />
              <Card />
            </Col>
          </Row>
        </div>
      </div>

      {/* modal for enlarged image */}
      <Modal
        title={'Enlarged Media'}
        width={640}
        visible={isMediaModalOpen}
        onOk={() => {
          setMediaModalOpen(false)
          setMediaUrl(null)
        }}
        onCancel={() => {
          setMediaModalOpen(false)
          setMediaUrl(null)
        }}>
        <img width={'100%'} src={mediaUrl} alt={'media-url'} />
      </Modal>
    </Layout.Content>
  )
}

const styles = {
  content: {
    height: '100%',
    overflowY: 'auto'
  },
  headerWrapper: {
    width: '70%',
    marginLeft: '15%',
    marginTop: 40,
    marginBottom: 30,
    display: 'flex',
    justifyContent: 'space-between'
  },
  listWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  list: {
    width: '70%',
    textAlign: 'left'
  }
}

export default EmergencyRequestsV2
