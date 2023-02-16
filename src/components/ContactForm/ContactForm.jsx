import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const ContactForm =({addContact}) => {

const [value, setValue] = useState({
    name: '',
    number: '',
})

 const handleFormChange = event => {
    const target = event.target.name;
    const inputValue = event.target.value;

    setValue(prevState=>{
     return {
      ...prevState,
      [target]: inputValue,
     } 
    });
  };

  const handleFormSumbit = event => {
    event.preventDefault();

    const { name, number } = value;
    const newContact = {
      name,
      number,
      id: nanoid(),
    };
    addContact(newContact);
    setValue({
      name: '',
      number: '',
    });
  };

    return (
      <div>
        <form className={css.form} onSubmit={handleFormSumbit}>
          <p className={css.inputTitle}>Name</p>
          <input
            type="text"
            name="name"
            value={value.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            onChange={handleFormChange}
            required
          />
          <p className={css.inputTitle}>Number</p>
          <input
            type="tel"
            name="number"
            value={value.number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            onChange={handleFormChange}
            required
          />
          <button className={css.submitBtn} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }

  ContactForm.propTypes = {
    addContact: PropTypes.func.isRequired,
  }