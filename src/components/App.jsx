import { ContactForm } from './ContactForm/ContactForm';
import { useState, useEffect } from 'react';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import Notiflix from 'notiflix';

const LOCAL_STORAGE_KEY = 'arrayOfContacts';

export const App = () => {
  const [contacts, setContacts] = useState(getLocalStorageContacts() ?? []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem(LOCAL_STORAGE_KEY, stringifiedContacts);
  }, [contacts]);

  function getLocalStorageContacts() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  }

  const addNewContact = newContact => {
    if (contacts.some(contact => contact.name === newContact.name)) {
      Notiflix.Notify.failure(`${newContact.name} is already in the contacts`);
      return;
    }
    setContacts(prevState => [...prevState, newContact]);
  };

  const handleClick = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const handleFilter = event => {
    const value = event.target.value.toLowerCase();
    if (!contacts.some(({ name }) => name.toLowerCase().includes(value))) {
      Notiflix.Notify.failure(`${value} is not in the contacts`);
    }
    setFilter(value);
  };

  const filterData = () => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ marginBottom: '20px' }}>Phonebook</h1>
      <ContactForm addContact={addNewContact} />
      <h2 style={{ marginBottom: '20px' }}>Contacts</h2>
      <Filter value={filter} filterContacts={handleFilter} />
      <ContactList deleteContact={handleClick} contactsData={filterData()} />
    </div>
  );
};
