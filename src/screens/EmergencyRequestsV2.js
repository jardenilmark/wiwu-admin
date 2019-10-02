import React, { useState } from 'react'
import {
  Layout,
  Input,
  Radio,
  Row,
  Col,
  Card,
  Tag,
  Icon,
  Spin,
  Button,
  Tooltip
} from 'antd'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import ProgressiveImage from 'react-progressive-image'
import Spacer from '../components/Spacer'
import moment from 'moment'
import _ from 'lodash'

const EmergencyRequestsV2 = () => {
  const [filter, setFilter] = useState('all')
  const { list: requests } = useSelector(({ emergency }) => emergency)

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
        <Radio.Group
          value={filter}
          buttonStyle='solid'
          onChange={e => {
            const value = e.target.value
            setFilter(value)
          }}>
          <Radio.Button value='all'>
            <strong>All</strong>
          </Radio.Button>
          <Radio.Button value='police'>
            <strong>Police</strong>
          </Radio.Button>
          <Radio.Button value='fire'>
            <strong>Fire</strong>
          </Radio.Button>
          <Radio.Button value='medical'>
            <strong>Medical</strong>
          </Radio.Button>
        </Radio.Group>
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
                          <Tag color={'orange'}>ASSIGNED</Tag>
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
                                <img
                                  onClick={() =>
                                    alert(
                                      'Imagine a modal with the enlarged image'
                                    )
                                  }
                                  height={100}
                                  src={src}
                                  alt={'media'}
                                  style={{ objectFit: 'cover' }}
                                />
                              )
                            }
                          </ProgressiveImage>
                        )
                      }
                      extra={
                        <Tooltip title='Move card forward'>
                          <Button icon={'arrow-right'} />
                        </Tooltip>
                      }
                      actions={[
                        <Tooltip key={'broadcast'} title='Broadcast emergency'>
                          <Icon type='global' />
                        </Tooltip>,
                        <Tooltip key={'show-location'} title='Show in map'>
                          <Icon type='environment' />
                        </Tooltip>,
                        <Tooltip key={'mark-spam'} title='Mark as spam'>
                          <Icon type='stop' style={{ color: 'red' }} />
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
                        <tr>
                          <td style={{ paddingRight: 8 }}>Responder</td>
                          <td>
                            Ronna Mae Firmo (<a>change</a>)
                          </td>
                        </tr>
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
                      </table>
                      <Spacer height={8} />
                      <Input.TextArea
                        value={'I am requesting blah blah'}
                        autosize={true}
                        disabled={true}
                      />
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
