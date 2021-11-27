import admin from 'firebase-admin'

// The service account key for accessing firestore.
import serviceAccount from './serviceAccountKey.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://editor-pepper.firebaseio.com"
})

export default admin.database()
