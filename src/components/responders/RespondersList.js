import React, { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { List, Avatar, Tag } from 'antd'

import { fetchResponders } from '../../actions/responder/fetchResponders.action'
import { getTagColor } from '../../helpers/responder/getTagColor'
import { getListItemActions } from '../../helpers/responder/getListItemActions'

import EditResponderModal from './EditResponderModal'
import Spinner from '../Spinner'

const RespondersList = () => {
  const dispatch = useDispatch()
  const responders = useSelector(state => state.admin.responders)
  const filteredResponders = useSelector(
    state => state.admin.filteredResponders
  )
  const [fetching, setFetchingStatus] = useState(true)

  useEffect(() => {
    // TODO -R
    async function fetchData() {
      await dispatch(fetchResponders())
      setFetchingStatus(false)
    }

    fetchData()
  }, [])

  if (fetching) {
    return <Spinner tip='Fetching Responders...' height={700} />
  }

  return (
    <div style={styles.listWrapper}>
      <EditResponderModal />
      <List
        style={styles.list}
        itemLayout='horizontal'
        pagination={{ pageSize: 7, hideOnSinglePage: true, size: 'small' }}
        dataSource={filteredResponders || responders}
        renderItem={responder => {
          const color = getTagColor(responder.status)
          const actions = getListItemActions(responder, dispatch)
          return (
            <List.Item actions={actions}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={require('../../assets/images/user-avatar.png')}
                    size={45}
                  />
                }
                title={
                  <b>
                    {responder.firstName} {responder.lastName} |{' '}
                    <Tag color={color}>{responder.status.toUpperCase()}</Tag>
                  </b>
                }
                description={
                  <Fragment>
                    <span>{responder.department}</span>
                    <br />
                    <span>{responder.phoneNumber}</span>
                  </Fragment>
                }
              />
            </List.Item>
          )
        }}
      />
    </div>
  )
}

const styles = {
  listWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  list: {
    width: '70%',
    textAlign: 'left'
  }
}

export default RespondersList
