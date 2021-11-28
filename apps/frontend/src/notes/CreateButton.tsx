import React from 'react'
import { Button } from '@mui/material'
import { newNote } from './hooks'

const CreateButton: React.FC = () => {
  return (
    <Button variant="contained" onClick={newNote}>New</Button>
  )
}

export default CreateButton
