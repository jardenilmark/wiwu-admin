import { message } from 'antd'
import { createAction } from 'redux-actions'

import { auth } from '../../firebase'

import { SIGNOUT } from './admin.constants'

import { history } from '../../history'

export const signOut = () => {
  return async dispatch => {
    try {
      await auth.signOut()

      dispatch(createAction(SIGNOUT)())
      history.push('/auth/signIn')
    } catch (error) {
      message.error(error.message, 10)
    }
  }
}
