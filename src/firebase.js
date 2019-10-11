// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from 'firebase/app'
// Add the Firebase services that you want to use
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBvUkXmNQ5VDKN46EYEPy8QuHluzzpxvog',
  authDomain: 'wiwu-48f9e.firebaseapp.com',
  databaseURL: 'https://wiwu-48f9e.firebaseio.com',
  projectId: 'wiwu-48f9e',
  storageBucket: 'wiwu-48f9e.appspot.com',
  messagingSenderId: '900668914554',
  appId: '1:900668914554:web:90b417061296d685e674c3',
  measurementId: 'G-55KP1BV024'
}
const main = firebase.initializeApp(firebaseConfig, 'main')
const secondary = firebase.initializeApp(firebaseConfig, 'secondary')
const mainAuth = main.auth()
const secondaryAuth = secondary.auth()
const firestore = main.firestore()
// Initialize Firebase
export { mainAuth as auth, firestore, secondaryAuth }
