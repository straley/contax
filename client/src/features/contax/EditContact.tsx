import React, {useState} from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Button} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { getActiveContact, setShowEditContactDialog, apiCreateContact } from './contactsSlice'

interface EditContactProps {
  isNew?: boolean
  firstName?: string
  lastName?: string
  phoneNumber?: string
}

function EditContact(props: EditContactProps) {
  const dispatch = useDispatch()

  const [firstName, setFirstName] = useState(props.firstName || ""); 
  const [lastName, setLastName] = useState(props.lastName || ""); 
  const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber || ""); 


  function handleCancel() {
    dispatch(setShowEditContactDialog(false))
  }

  function handleSave() {
    console.log("SAVE")
    dispatch(apiCreateContact({
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber
    }))
    dispatch(setShowEditContactDialog(false))
  }
  
  function handleUpdate() {
    console.log("UPDATE")
    dispatch(setShowEditContactDialog(false))
  }

  const activeContact = useSelector(getActiveContact)

  const isNew = activeContact === null

  return (
    <Dialog open={true} onClose={handleCancel} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{ isNew ? "New Contact" : "Edit Contact"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {
            isNew 
            ? "Please enter the new contact details below" 
            : "Update the contact details below"
          }
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="firstName"
          label="First Name"
          type="text"
          fullWidth
          value={firstName}
          onChange={e => setFirstName((e.target as HTMLInputElement).value)}
        />
        <TextField
          margin="dense"
          id="lastName"
          label="Last Name"
          type="text"
          fullWidth
          value={lastName}
          onChange={e => setLastName((e.target as HTMLInputElement).value)}
        />
        <TextField
          margin="dense"
          id="phoneNumber"
          label="Phone Number"
          type="text"
          fullWidth
          value={phoneNumber}
          onChange={e => setPhoneNumber((e.target as HTMLInputElement).value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={isNew ? handleSave : handleUpdate} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditContact