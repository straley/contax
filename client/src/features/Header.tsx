import React from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import { AppBar, Toolbar, IconButton, Typography, Button} from '@material-ui/core'
import { Menu as MenuIcon, AddCircle as AddCircleIcon } from '@material-ui/icons'

import { setShowEditContactDialog } from './contax/contactsSlice'

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

function Header() {
  const classes = useStyles()
  const dispatch = useDispatch()  

  const handleShowEditorClick = () => {
    dispatch(setShowEditContactDialog(true))
  }

  return (
    <AppBar position="static">
    <Toolbar>
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" className={classes.title}>
        Contax
      </Typography>
      <Button color="inherit" onClick={handleShowEditorClick}><AddCircleIcon/></Button>
    </Toolbar>
  </AppBar>
  )
}

export default Header