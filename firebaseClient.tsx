import * as firebase from 'firebase/app'
import {FirebaseAuthProvider} from 'react-admin-firebase'

import {getAuth, browserLocalPersistence} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBYS2iRogvuU6mbHuHDoB1XaELDGUKeBp8',
  authDomain: 'course-platform-5ebc0.firebaseapp.com',
  projectId: 'course-platform-5ebc0',
  storageBucket: 'course-platform-5ebc0.appspot.com',
  messagingSenderId: '476289106525',
  appId: '1:476289106525:web:ecf6aa7dd5d04bfbc343b4',
  measurementId: 'G-FBD8N5QH07',
}

if (typeof window !== 'undefined' && !firebase.getApps().length) {
  firebase.initializeApp(firebaseConfig)
  getAuth(firebase.getApp()).setPersistence(browserLocalPersistence)
}

// for react-admin
export const firebaseAuthProvider = FirebaseAuthProvider(firebaseConfig, {})

export {firebase}
