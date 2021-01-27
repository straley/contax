import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import { 
  List, ListItem, ListItemText 
} from '@material-ui/core';

import { selectContacts } from "./contactsSlice"

// import {
//   decrement,
//   increment,
//   incrementByAmount,
//   incrementAsync,
//   selectCount,
// } from './counterSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}))

function ContaxList() {
  const classes = useStyles()

  const contacts = useSelector(selectContacts)
  console.log(contacts)

  return contacts && contacts.length ? (
    <List className={classes.root} subheader={<li />}>
      {contacts.map((contact) => (
        <ListItem key={`contact-${contact.id}`}>
          <ListItemText primary={`${contact.first_name} ${contact.last_name}`} />
        </ListItem>
      ))}
    </List>
  ) : null
}

export default ContaxList;