import { firestore as db } from '../../firebase'
import { EDIT_CONTACT_FAILED, EDIT_CONTACT_SUCCESS } from './contact.constants'
import { createAction } from 'redux-actions'
import { fetchContacts } from './fetchContacts.action'

export const editContact = (values, id) => {
  return async dispatch => {
    try {
      await db
        .collection('contacts')
        .doc(id)
        .update(values)
      dispatch(createAction(EDIT_CONTACT_SUCCESS)())
      dispatch(fetchContacts())
    } catch (error) {
      alert(error.message)
      dispatch(createAction(EDIT_CONTACT_FAILED)(error.message))
    }
  }
}
