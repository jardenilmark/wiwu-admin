import { message } from 'antd'
import { createAction } from 'redux-actions'

import { firestore as db } from '../../firebase'
import { getAddress } from '../../helpers/common/getAddress'

import { GET_USERS } from './user.constants'
import { roles } from '../../constants/User'

export const getUsers = () => {
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

      dispatch(createAction(GET_USERS)(users))
    } catch (error) {
      message.error(error.message, 5)
    }
  }
}
