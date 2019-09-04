import { firestore as db } from '../../firebase'
import Geocode from 'react-geocode'
import { FETCH_USERS_FAILED, FETCH_USERS_SUCCESS } from './user.constants'
import { roles } from '../../constants/User'
import { createAction } from 'redux-actions'

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
  let users = []
  return async dispatch => {
    try {
      const usersRef = await db
        .collection('users')
        .where('role', '==', roles.USER)
        .get()
      users = usersRef.docs.map(user => {
        return {
          ...user.data(),
          id: user.id,
          address: getAddress(user.data()).homeCoordinates
        }
      })
      dispatch(createAction(FETCH_USERS_SUCCESS)(users))
    } catch (error) {
      dispatch(createAction(FETCH_USERS_FAILED)(error.message))
    }
  }
}
