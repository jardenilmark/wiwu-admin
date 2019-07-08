// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from 'firebase/app'

// Add the Firebase services that you want to use
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: 'AIzaSyBwvfQvIxe14wJMbOvSoAGLeaG3t5KSsfM',
  authDomain: 'weewoo-b9408.firebaseapp.com',
  databaseURL: 'https://weewoo-b9408.firebaseio.com',
  projectId: 'weewoo-b9408',
  storageBucket: '',
  messagingSenderId: '363729210043',
  appId: '1:363729210043:web:47b0c446dc062344'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const auth = firebaseApp.auth()
const firestore = firebaseApp.firestore()
// Initialize Firebase
export { auth, firestore }
