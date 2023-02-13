import { ContactForm } from './ContactForm/ContactForm';
import { Component } from 'react';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import Notiflix from 'notiflix';

const LOCAL_STORAGE_KEY = 'arrayOfContacts';

export class App extends Component {
  state = {
    contacts: this.getLocalStorageContacts() ?? [],
    filter: '',
  };

  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      const stringifiedContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem(LOCAL_STORAGE_KEY, stringifiedContacts);
    }
  }
  getLocalStorageContacts() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  }

  addNewContact = newContact => {
    if (this.state.contacts.some(contact => contact.name === newContact.name)) {
      Notiflix.Notify.failure(`${newContact.name} is already in the contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleClick = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilter = event => {
    if (
      !this.state.contacts.some(contact =>
        contact.name.includes(event.target.value)
      )
    ) {
      Notiflix.Notify.failure(`${event.target.value} is not in the contacts`);
    }
    this.setState({ filter: event.target.value });
  };

  render() {
    const filteredContacts = this.state.contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .trim()
        .includes(this.state.filter.toLowerCase());
    });

    return (
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ marginBottom: '20px' }}>Phonebook</h1>
        <ContactForm addContact={this.addNewContact} />
        <h2 style={{ marginBottom: '20px' }}>Contacts</h2>
        <Filter value={this.state.filter} filterContacts={this.handleFilter} />
        <ContactList
          deleteContact={this.handleClick}
          contactsData={filteredContacts}
        />
      </div>
    );
  }
}
