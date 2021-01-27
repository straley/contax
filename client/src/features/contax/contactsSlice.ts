import {  createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface ContaxContact {
  id?: number;
  first_name: string;
  last_name: string;
  phone_number: string;
}

interface ContaxState {
  name: string,
  contacts: ContaxContact[]
  loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  currentRequestId?: number,
  error: string|null
}

const initialState: ContaxState = {
  name: 'contacts',
  contacts: [],
  loading: 'idle',
  error: null
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetch',
  async (_, { signal }) => {
    const source = axios.CancelToken.source()
    signal.addEventListener('abort', () => {
      source.cancel()
    })
    const response = await axios.get(`http://127.0.0.1:8000/contacts/?format=json`, {
      cancelToken: source.token,
    })
    return response.data as ContaxContact[]
  }
)

export const selectContacts = (state: {contacts: ContaxState}) => {
  return state.contacts.contacts
}

const contacts = createAction<ContaxContact[], 'fetch'>('fetch')
console.log("CONTACTS", contacts)

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    create: (state, action: PayloadAction<ContaxContact>) => {
      state.contacts.push(action.payload)
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchContacts.pending, (state, action) => {
      state.contacts = []
    })
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.contacts = action.payload
    })
    builder.addCase(fetchContacts.rejected, (state, action) => {
      state.contacts = []
      // todo: error
    })
  }
});

export const { create } = contactsSlice.actions;

export default contactsSlice.reducer;
