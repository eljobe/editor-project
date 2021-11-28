import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { Note } from 'model/note';

import serviceAccount from "./serviceAccountKey.json";

initializeApp({
  credential: cert(serviceAccount as ServiceAccount)
})

const db = getFirestore()

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
    db.collection('notes').onSnapshot((snapshot) => {
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
  async createNote() {
    const defaultContent = [
      {
        type: "paragraph",
        children: [
          { text: "Hello World" }
        ]
      }
    ];
    const defaultTitle = 'Untitled';
    const docRef = await db.collection('notes').add({
      title: defaultTitle,
      content: defaultContent,
    });
    const freshNote = new Note(docRef.id, defaultTitle, defaultContent);
    this.notes.set(freshNote.id, freshNote);
    return freshNote;
  }
}

// Setup a singleton in the global scope.
const ndb = new NotesDatabase()
ndb.initialize()

export default ndb
