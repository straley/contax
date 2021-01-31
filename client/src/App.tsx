import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './App.css'

import ContaxList from './features/contax/ContaxList'
import Header from './features/Header'
import EditContact from './features/contax/EditContact'

import { apiFetchContacts, getShowEditContactDialog } from './features/contax/contactsSlice'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(apiFetchContacts())    
  })

  const showEditContact = useSelector(getShowEditContactDialog)
  
  return (
    <div className="App">
      <Header/>
      <ContaxList/>
      { showEditContact ? <EditContact/> : null}      
    </div>
  )
}

export default App
