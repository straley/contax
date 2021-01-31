import {  createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { AppThunk, RootState } from '../../app/store'

interface ContaxContact {
  id?: number
  first_name: string
  last_name: string
  phone_number: string
}

interface ContaxState {
  name: string,
  contacts: ContaxContact[]
  loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  currentRequestId?: number,
  error: string|null,
  showEditContactDialog: boolean,
  activeContact: ContaxContact|null,
}

const initialState: ContaxState = {
  name: 'contacts',
  contacts: [],
  loading: 'idle',
  error: null,
  showEditContactDialog: false,
  activeContact: null,
}

export const apiFetchContacts = createAsyncThunk(
  'contacts/fetch',
  async (_, { signal }) => {
    const source = axios.CancelToken.source()
    signal.addEventListener('abort', () => {
      source.cancel()
    })
    const response = await axios.get(`http://127.0.0.1:8000/api/contacts/?format=json`, {
      cancelToken: source.token,
    })
    return response.data as ContaxContact[]
  }
)

export const apiCreateContact = createAsyncThunk(
  'contacts/create',
  async (contact: ContaxContact, { signal }) => {
    const source = axios.CancelToken.source()
    signal.addEventListener('abort', () => {
      source.cancel()
    })
    const response = await axios.post(`http://127.0.0.1:8000/api/contacts/`, 
    contact, 
    {
      cancelToken: source.token,
    })
    return response.data as ContaxContact[]
  }
)

export const getShowEditContactDialog = (state: {contacts: ContaxState}) => {
  return state.contacts.showEditContactDialog
}

export const getActiveContact = (state: {contacts: ContaxState}) => {
  return state.contacts.activeContact
}

export const selectContacts = (state: {contacts: ContaxState}) => {
  return state.contacts.contacts
}

export const showEditContactDialog = (show: boolean): AppThunk => dispatch => {
  dispatch(setShowEditContactDialog(show))
}

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    // createContact: (state, action: PayloadAction<ContaxContact>) => {
    //   apiCreateContact(action.payload)
    // },
    setShowEditContactDialog: (state, action: PayloadAction<boolean>) => {
      state.showEditContactDialog = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(apiFetchContacts.pending, (state, action) => {
      state.contacts = []
    })
    builder.addCase(apiFetchContacts.fulfilled, (state, action) => {
      state.contacts = action.payload
    })
    builder.addCase(apiFetchContacts.rejected, (state, action) => {
      state.contacts = []
      // todo: error
    })
    builder.addCase(apiCreateContact.pending, (state, action) => {
    })
    builder.addCase(apiCreateContact.fulfilled, (state, action) => {
    })
    builder.addCase(apiCreateContact.rejected, (state, action) => {
      // todo: error
    })
  }
})

export const { setShowEditContactDialog } = contactsSlice.actions
export default contactsSlice.reducer
