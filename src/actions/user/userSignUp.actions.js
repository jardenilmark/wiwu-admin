import { auth, firestore as db } from '../../firebase'

const signUp = ({ emailAddress, password, ...rest }) => {
  return async dispatch => {
    try {
      const result = await auth.createUserWithEmailAndPassword(
        emailAddress,
        password
      )
      const uid = result.user.uid
      const docReference = await db
        .collection('users')
        .doc(uid)
        .set({
          ...rest
        })
      console.log(docReference)
    } catch (error) {
      console.log(error.message)
    }
  }
}

export { signUp }
