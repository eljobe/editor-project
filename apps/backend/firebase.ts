import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { Note } from 'model/note'

// The service account key for accessing firestore.
import serviceAccount from './serviceAccountKey.json'

initializeApp({
  apiKey: "AIzaSyCo_k4KIhJnzhztRHJSvTLCm4WjyyipvT4",
  authDomain: "editor-pepper.firebaseapp.com",
  projectId: "editor-pepper",
  storageBucket: "editor-pepper.appspot.com",
  messagingSenderId: "673074271391",
  appId: "1:673074271391:web:888ffa3a5359395c81feaa"
})

class NotesDatabase {
  notes: Map<string, Note>;
  constructor(notes?: Map<string, Note>) {
    if (notes !== undefined) {
      this.notes = notes;
    } else {
      this.notes = new Map<string, Note>();
    }
  }
  // Sets up a listener to populate the notes map when the database cahanges.
  initialize() {
    onSnapshot(query(collection(getFirestore(), 'notes')), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'removed') {
          this.notes.delete(change.doc.id)
        } else {
          this.notes.set(
            change.doc.id,
            new Note(
              change.doc.id,
              change.doc.data()["title"],
              change.doc.data()["content"]));
        }
      });
    });
  }
}

// Setup a singleton in the global scope.
const db = new NotesDatabase()
db.initialize()

export default db
