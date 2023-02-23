import { createSlice } from '@reduxjs/toolkit';

const contactsInitialState = {
  contacts: [],
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
    deleteContact(state, action) {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
    addContacts(state, action) {
      state.contacts.push(action.payload);
    },
  },
});

export const { setContacts, addContacts, setFilter, deleteContact } =
  contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
