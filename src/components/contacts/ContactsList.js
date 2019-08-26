import React, { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchContacts } from '../../actions/contact/fetchContacts.action'
import { deleteContact } from '../../actions/contact/deleteContact.action'
import { List, Avatar, Icon, Popconfirm } from 'antd'

import Spinner from '../Spinner'

const ContactsList = () => {
  const dispatch = useDispatch()
  const contacts = useSelector(state => state.contact.contacts)
  const [fetching, setFetchingStatus] = useState(true)

  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchContacts())
      setFetchingStatus(false)
    }

    fetchData()
  }, [])

  if (fetching) {
    return <Spinner tip='Fetching Contacts...' />
  }

  return (
    <div style={styles.listWrapper}>
      <List
        style={{ width: '70%', textAlign: 'left' }}
        itemLayout='horizontal'
        pagination={{ pageSize: 7, hideOnSinglePage: true, size: 'small' }}
        dataSource={contacts}
        renderItem={contact => {
          return (
            <List.Item
              actions={[
                <Popconfirm
                  placement='top'
                  title='Are you sure you want to delete this contact?'
                  onConfirm={() => dispatch(deleteContact(contact.id))}
                  okText='Yes'
                  cancelText='No'>
                  <Icon type='delete' style={{ fontSize: 18 }} />
                </Popconfirm>
              ]}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={require(`../../assets/images/${contact.department}.png`)}
                    size={45}
                  />
                }
                title={<b>{contact.name}</b>}
                description={
                  <Fragment>
                    <span>{contact.address}</span>
                    <br />
                    <span>{contact.numbers.join(', ')}</span>
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
  }
}

export default ContactsList
