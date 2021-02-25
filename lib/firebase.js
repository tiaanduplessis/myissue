import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
// import 'firebase/analytics'
import "@firebase/storage"

if (!firebase.apps.length) {
  firebase.initializeApp({
    appId: process.env.NEXT_PUBLIC_APP_ID,
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  })
  // firebase.analytics()
}

export default firebase
