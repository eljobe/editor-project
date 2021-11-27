import React from 'react'
import { Button } from '@mui/material'
import { newNote } from './hooks'

interface CreateButtonProps {}

const CreateButton: React.FC<CreateButtonProps> = () => {
  return (
    <Button variant="contained" onClick={newNote}>New</Button>
  )
}

export default CreateButton