import Geocode from 'react-geocode'
import { message } from 'antd'
import { createAction } from 'redux-actions'

import { CREATE_CONTACT } from './contact.constants'

import { firestore as db } from '../../firebase'

const getCoordinates = async address => {
  let location

  try {
    Geocode.setApiKey('AIzaSyBwvfQvIxe14wJMbOvSoAGLeaG3t5KSsfM')
    const response = await Geocode.fromAddress(address)
    location = response.results[0].geometry.location
  } catch (error) {
    console.log('geocode error: ', error.message)
  }

  return {
    latitude: location.lat,
    longitude: location.lng
  }
}

export const createContact = ({ address, ...rest }) => {
  return async dispatch => {
    try {
      const location = await getCoordinates(address)

      const contact = await db.collection('contacts').add({
        ...rest,
        address,
        location
      })

      const payload = {
        id: contact.id,
        ...rest,
        address,
        location
      }

      message.success('Contact created successfully!', 10)
      dispatch(createAction(CREATE_CONTACT)(payload))
    } catch (error) {
      message.error(error.message, 10)
    }
  }
}
