import express, { RequestHandler, Response } from 'express'
import { WebsocketRequestHandler } from 'express-ws'
import { Descendant } from 'slate'
import { NOTE_1, NOTE_2 } from '../fixtures/notes'
import { collection, getDocs } from 'firebase/firestore'
import { Note } from 'model/note'
import db from '../firebase'

// Patch `express.Router` to support `.ws()` without needing to pass around a `ws`-ified app.
// https://github.com/HenningM/express-ws/issues/86
// eslint-disable-next-line @typescript-eslint/no-var-requires
const patch = require('express-ws/lib/add-ws-method')
patch.default(express.Router)

const router = express.Router()

export interface NotesResponse {
  notes: Array<{
    id: string
    title: string
  }>
}

export interface NoteResponse {
  id: string
  title: string
  content: Array<Descendant>
}

const notesHandler: RequestHandler = (_req, res: Response<NotesResponse>) => {
  const data = { notes: [] } as NotesResponse;
  for (const [k, v] of db.notes) {
    data.notes.push({
      id: v.id,
      title: v.title
    });
  }
  res.json(data)
}

const noteHandler: WebsocketRequestHandler = (ws, req) => {
  ws.on('message', () => {
    if (db.notes.has(req.params.id)) {
      const note = db.notes.get(req.params.id)
      if (note !== undefined ) {
        return ws.send(JSON.stringify(note))
      }
    }
  })
}

router.get('/', notesHandler)
router.ws('/:id', noteHandler)

export default router
