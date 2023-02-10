import css from './Filter.module.css';
import PropTypes from 'prop-types';

export const Filter = ({ filterContacts, value }) => {
  return (
    <div className={css.container}>
      <p className={css.title}>Find contacts by name</p>
      <input
        type="text"
        name="name"
        value={value}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={filterContacts}
      />
    </div>
  );
};

Filter.propTypes = {
  filterContacts: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
