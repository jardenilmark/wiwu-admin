import { firestore as db } from '../../firebase'
import {
  DELETE_CONTACT_FAILED,
  DELETE_CONTACT_SUCCESS
} from './contact.constants'
import { createAction } from 'redux-actions'
import { fetchContacts } from './fetchContacts.action'

export const deleteContact = contactId => {
  return async dispatch => {
    try {
      await db
        .collection('contacts')
        .doc(contactId)
        .delete()
      dispatch(fetchContacts())
      dispatch(createAction(DELETE_CONTACT_SUCCESS)())
    } catch (error) {
      alert(error.message)
      dispatch(createAction(DELETE_CONTACT_FAILED)(error.message))
    }
  }
}
