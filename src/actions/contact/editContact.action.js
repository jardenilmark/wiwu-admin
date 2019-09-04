import _ from 'lodash'
import { message } from 'antd'
import { createAction } from 'redux-actions'

import { firestore as db } from '../../firebase'

import { EDIT_CONTACT } from './contact.constants'

export const editContact = (values, id) => {
  return async (dispatch, getState) => {
    try {
      // TODO what if the location is being edited
      await db
        .collection('contacts')
        .doc(id)
        .update(values)

      const {
        admin: { contacts }
      } = getState()

      const index = _.findIndex(contacts, e => e.id === id)
      const editedContacts = [...contacts]
      editedContacts[index] = values

      message.success('Contact updated successfully!', 10)
      dispatch(createAction(EDIT_CONTACT)(editedContacts))
    } catch (error) {
      alert(error.message)
      message.error(error.message, 10)
    }
  }
}
