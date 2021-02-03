import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import 'firebase/analytics'

if (!firebase.apps.length) {
  firebase.initializeApp({
    appId: process.env.NEXT_PUBLIC_APP_ID,
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  })
  firebase.analytics()
}


export default firebase
