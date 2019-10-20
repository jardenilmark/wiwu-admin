import React, { useState, useEffect } from 'react'
import { Layout, Input, Row, Modal, Button, Tooltip, Tabs, Tag } from 'antd'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { CSVLink } from 'react-csv'
import moment from 'moment'
import { getCsvData } from '../helpers/common/getCsvData.helper'
import RequestsColumn from '../components/emergency-request/RequestsColumn'
import RequestsTab from '../components/emergency-request/RequestsTab'
import _ from 'lodash'
import { getDepartmentTagColor } from '../helpers/common/getDepartmentTagColor.helper'
import RequestBody from '../components/emergency-request/RequestBody'
import RequestMedia from '../components/emergency-request/RequestMedia'
import Spacer from '../components/Spacer'
import styled from 'styled-components'
import FuzzySearch from 'fuzzy-search'

const StyledNoPaddingModal = styled(Modal)`
  .ant-modal-body {
    padding: 0px;
  }
`

const desc =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

const EmergencyRequests = () => {
  const [isMediaModalOpen, setMediaModalOpen] = useState(false)
  const [isRequestModalOpen, setRequestModalOpen] = useState(false)
  const [media, setMedia] = useState(null)
  const [request, setRequest] = useState(null)
  const [csvData, setCsvData] = useState([])
  const [isSpamRequestsVisible, setSpamRequestsVisibility] = useState(true)
  const [viewType, setViewType] = useState('list')
  const [currentTab, setCurrentTab] = useState('pending')
  const [filteredPendings, setFilteredPendings] = useState([])
  const [filteredCompleteds, setFilteredCompleteds] = useState([])
  const [filteredSpams, setFilteredSpams] = useState([])
  const { emergency, admin } = useSelector(state => state)
  const { list: requests } = emergency
  const { current: user } = admin

  const pendings = requests.filter(
    ({ status, isMarkedSpam }) => status === 'PENDING' && !isMarkedSpam
  )
  const completeds = requests.filter(
    ({ status, isMarkedSpam }) => status === 'COMPLETED' && !isMarkedSpam
  )
  const spams = requests.filter(({ isMarkedSpam }) => isMarkedSpam)

  useEffect(() => {
    if (requests.length <= 0) {
      return
    }

    setCsvData(
      getCsvData(
        requests,
        user.department,
        spams.length,
        pendings.length,
        completeds.length
      )
    )
  }, [requests])

  const searchRequests = (group, input) => {
    let arrayToSearch
    let setFiltered
    if (_.lowerCase(group) === 'pending') {
      arrayToSearch = pendings
      setFiltered = setFilteredPendings
    } else if (_.lowerCase(group) === 'completed') {
      arrayToSearch = completeds
      setFiltered = setFilteredCompleteds
    } else {
      arrayToSearch = spams
      setFiltered = setFilteredSpams
    }

    const searcher = new FuzzySearch(
      arrayToSearch,
      ['name', 'address', 'role'],
      {
        sort: true
      }
    )

    setFiltered(searcher.search(input))
  }

  return (
    <Layout.Content style={styles.content}>
      <Helmet>
        <title>Emergency Requests - wiwu admin</title>
      </Helmet>

      {/* header */}
      <div style={styles.headerWrapper}>
        <div>
          <Input.Search
            placeholder='Search emergency requests...'
            style={{ width: 240 }}
            onSearch={value => searchRequests(currentTab, value)}
          />
          <Tooltip title='Compact List View'>
            <Button
              onClick={() => setViewType('list')}
              style={{ marginLeft: 12, marginRight: 6 }}
              type={viewType === 'list' ? 'primary' : 'ghost'}
              icon='unordered-list'
            />
          </Tooltip>
          <Tooltip title='Trello View'>
            <Button
              onClick={() => setViewType('trello')}
              type={viewType === 'trello' ? 'primary' : 'ghost'}
              icon='appstore'
            />
          </Tooltip>
        </div>
        <div>
          <Button type='dashed' style={{ marginRight: 6 }}>
            <CSVLink
              data={csvData}
              filename={`${user.department}-${moment()
                .toDate()
                .toLocaleDateString()}-Report`}
              onClick={() => !(csvData.length <= 0)}>
              Download Report
            </CSVLink>
          </Button>
          <Button
            type='dashed'
            onClick={() => setSpamRequestsVisibility(!isSpamRequestsVisible)}>
            {isSpamRequestsVisible
              ? 'Hide Spam Requests'
              : 'Show Spam Requests'}
          </Button>
        </div>
      </div>

      {/* list of alerts */}
      <div style={styles.listWrapper}>
        <div style={styles.list}>
          {viewType === 'trello' ? (
            <Row gutter={16} type='flex' justify='center'>
              <RequestsColumn
                title={'Pending'}
                requests={pendings}
                user={user}
                isSpamRequestsVisible={isSpamRequestsVisible}
                setMediaModalOpen={setMediaModalOpen}
                setMedia={setMedia}
              />
              <RequestsColumn
                title={'Completed'}
                requests={completeds}
                user={user}
                isSpamRequestsVisible={isSpamRequestsVisible}
                setMediaModalOpen={setMediaModalOpen}
                setMedia={setMedia}
              />
              {isSpamRequestsVisible && (
                <RequestsColumn
                  title={'Spam'}
                  requests={spams}
                  user={user}
                  isSpamRequestsVisible={isSpamRequestsVisible}
                  setMediaModalOpen={setMediaModalOpen}
                  setMedia={setMedia}
                />
              )}
            </Row>
          ) : (
            <Tabs
              defaultActiveKey='pending'
              onChange={tab => setCurrentTab(tab)}>
              <Tabs.TabPane tab='Pending' key='pending'>
                <RequestsTab
                  title={'pending'}
                  requests={
                    !_.isEmpty(filteredPendings) ? filteredPendings : pendings
                  }
                  user={user}
                  setMediaModalOpen={setMediaModalOpen}
                  setMedia={setMedia}
                  setRequestModalOpen={setRequestModalOpen}
                  setRequest={setRequest}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab='Completed' key='completed'>
                <RequestsTab
                  title={'completed'}
                  requests={
                    !_.isEmpty(filteredCompleteds)
                      ? filteredCompleteds
                      : completeds
                  }
                  user={user}
                  setMediaModalOpen={setMediaModalOpen}
                  setMedia={setMedia}
                  setRequestModalOpen={setRequestModalOpen}
                  setRequest={setRequest}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab='Spam' key='spam'>
                <RequestsTab
                  title={'spam'}
                  requests={!_.isEmpty(filteredSpams) ? filteredSpams : spams}
                  user={user}
                  setMediaModalOpen={setMediaModalOpen}
                  setMedia={setMedia}
                  setRequestModalOpen={setRequestModalOpen}
                  setRequest={setRequest}
                />
              </Tabs.TabPane>
            </Tabs>
          )}
        </div>
      </div>

      {/* modal for enlarged image */}
      {media && (
        <StyledNoPaddingModal
          title={'Enlarged Media'}
          width={720}
          visible={isMediaModalOpen}
          onOk={() => {
            setMediaModalOpen(false)
            setMedia(null)
          }}
          onCancel={() => {
            setMediaModalOpen(false)
            setMedia(null)
          }}>
          {media.ext === 'jpg' ? (
            <img
              width={'100%'}
              height={500}
              style={{ objectFit: 'contain' }}
              src={media.url}
              alt={'media-url'}
            />
          ) : (
            <video
              width={'100%'}
              height={500}
              src={media.url}
              controls
              autoPlay
            />
          )}
        </StyledNoPaddingModal>
      )}

      {/* modal for expanded request */}
      {request && (
        <StyledNoPaddingModal
          title={
            <div>
              <Tag color={getDepartmentTagColor(request.department)}>
                {_.upperCase(request.department)}
              </Tag>
              {request.responderId && <Tag color={'orange'}>ASSIGNED</Tag>}
            </div>
          }
          width={640}
          visible={isRequestModalOpen}
          onOk={() => {
            setRequestModalOpen(false)
            setRequest(null)
          }}
          onCancel={() => {
            setRequestModalOpen(false)
            setRequest(null)
          }}>
          <div>
            {request.media && (
              <>
                <RequestMedia
                  media={request.media}
                  setMediaModalOpen={setMediaModalOpen}
                  setMedia={setMedia}
                  isSpamRequestsVisible={false}
                />
                <Spacer height={16} />
              </>
            )}
          </div>
          <div style={{ padding: '16px' }}>
            <RequestBody request={request} />
          </div>
        </StyledNoPaddingModal>
      )}
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

export default EmergencyRequests
