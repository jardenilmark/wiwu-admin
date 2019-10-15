import React, { useState } from 'react'
import { Layout, Input, Row, Modal, Button } from 'antd'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import RequestsColumn from '../components/emergency-request/RequestsColumn'

const EmergencyRequests = () => {
  const [isMediaModalOpen, setMediaModalOpen] = useState(false)
  const [mediaUrl, setMediaUrl] = useState(null)
  const [isSpamRequestsVisible, setSpamRequestsVisibility] = useState(false)
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

  return (
    <Layout.Content style={styles.content}>
      <Helmet>
        <title>Emergency Requests - wiwu admin</title>
      </Helmet>

      {/* header */}
      <div style={styles.headerWrapper}>
        <Input.Search
          placeholder='Search emergency requests...'
          style={{ width: 240 }}
        />
        <Button
          type='dashed'
          onClick={() => setSpamRequestsVisibility(!isSpamRequestsVisible)}>
          {isSpamRequestsVisible ? 'Hide Spam Requests' : 'Show Spam Requests'}
        </Button>
      </div>

      {/* list of alerts */}
      <div style={styles.listWrapper}>
        <div style={styles.list}>
          <Row gutter={16} justify='center' type='flex'>
            <RequestsColumn
              title={'Pending'}
              requests={pendings}
              user={user}
              setMediaModalOpen={setMediaModalOpen}
              setMediaUrl={setMediaUrl}
            />
            <RequestsColumn
              title={'Completed'}
              requests={completeds}
              user={user}
              setMediaModalOpen={setMediaModalOpen}
              setMediaUrl={setMediaUrl}
            />
            {isSpamRequestsVisible && (
              <RequestsColumn
                title={'Spam'}
                requests={spams}
                user={user}
                setMediaModalOpen={setMediaModalOpen}
                setMediaUrl={setMediaUrl}
              />
            )}
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

export default EmergencyRequests
