import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Button} from '@material-ui/core';
import { Menu as MenuIcon, Create as CreateIcon } from '@material-ui/icons';

// import { Counter } from './features/counter/Counter';
import './App.css';
import ContaxList from './features/contax/ContaxList';
import {
  fetchContacts,
} from './features/contax/contactsSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts())    
    // Your code here
  });

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Contax
          </Typography>
          <Button color="inherit"><CreateIcon /></Button>
        </Toolbar>
      </AppBar>

      <ContaxList/>
    </div>
  );
}

export default App;
