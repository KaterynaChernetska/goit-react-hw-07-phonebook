export const selectContacts = state => state.contactsData.contacts.items;
export const selectLoader = state => state.contactsData.contacts.isLoading;
export const selectError = state => state.contactsData.contacts.error;
export const selectFilter = state => state.contactsData.filter;


export const selectFilteredContacts = state => {
    return state.contactsData.contacts.items.filter(({ name }) =>
      name.toLowerCase().includes(state.contactsData.filter.toLowerCase())
    );
  };
