import { message } from 'antd'
import Geocode from 'react-geocode'
import { createAction } from 'redux-actions'

import { firestore as db } from '../../firebase'

import { FETCH_USERS } from './user.constants'

import { roles } from '../../constants/User'

const getAddress = async location => {
  let address

  try {
    Geocode.setApiKey('AIzaSyBwvfQvIxe14wJMbOvSoAGLeaG3t5KSsfM')
    const response = await Geocode.fromLatLng(
      location.latitude,
      location.longitude
    )
    address = response.results[0].formatted_address
  } catch (error) {
    console.log('geocode error: ', error.message)
  }

  return address
}

export const fetchUsers = () => {
  return async dispatch => {
    try {
      const usersRef = await db
        .collection('users')
        .where('role', '==', roles.USER)
        .get()

      const users = usersRef.docs.map(user => {
        return {
          ...user.data(),
          id: user.id,
          address: getAddress(user.data()).homeCoordinates
        }
      })

      dispatch(createAction(FETCH_USERS)(users))
    } catch (error) {
      message.error(error.message, 10)
    }
  }
}
