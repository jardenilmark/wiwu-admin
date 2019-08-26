import { firestore as db } from '../../firebase'
import Geocode from 'react-geocode'
import {
  CREATE_CONTACT_SUCCESS,
  CREATE_CONTACT_FAILED
} from './contact.constants'
import { fetchContacts } from '../contact/fetchContacts.action'
import { createAction } from 'redux-actions'

const getCoordinates = async address => {
  let location

  try {
    Geocode.setApiKey('AIzaSyBwvfQvIxe14wJMbOvSoAGLeaG3t5KSsfM')
    const response = await Geocode.fromAddress(address)
    location = response.results[0].geometry.location
  } catch (error) {
    console.log('geocode error: ', error.message)
  }

  return location
}

export const createContact = ({ address, ...rest }) => {
  return async dispatch => {
    const location = await getCoordinates(address)
    console.log(location)
    try {
      await db.collection('contacts').add({
        ...rest,
        address,
        location
      })
      dispatch(fetchContacts())
      dispatch(createAction(CREATE_CONTACT_SUCCESS)())
    } catch (error) {
      console.log(error.message)
      dispatch(createAction(CREATE_CONTACT_FAILED)(error.message))
    }
  }
}
