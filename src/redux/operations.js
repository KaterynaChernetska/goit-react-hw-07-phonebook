import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestContacts, postContact, deleteContactById } from 'services/api';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await requestContacts();
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contactToPost, thunkAPI) => {
    try {
      const response = await postContact(contactToPost);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const response = await deleteContactById(id);
      return response.id;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
