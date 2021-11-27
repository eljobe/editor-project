import React, { MouseEventHandler } from 'react'
import { Toolbar, Typography, Drawer, Divider, Box, Button, Container } from '@mui/material'
import { NotesList, CreateButton } from '../notes'

const drawerWidth = 240

interface InterfaceProps {
  activeNoteId?: string
}

const Interface: React.FC<InterfaceProps> = ({ activeNoteId, children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer variant="permanent" sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}>
        <Toolbar>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Notes
          </Typography>
          <CreateButton />
        </Toolbar>
        <Divider />
        <NotesList activeNoteId={activeNoteId} />
        <Divider />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          backgroundColor: '#eee',
          overflow: 'auto',
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  )
}

export default Interface
