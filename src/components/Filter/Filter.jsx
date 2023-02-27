import css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/contactsSlice';
import Notiflix from 'notiflix';
import { selectContacts, selectFilter } from 'redux/selectors';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const contacts = useSelector(selectContacts);

  const handleFilter = event => {
    const value = event.target.value.toLowerCase();
    if (!contacts.some(({ name }) => name.toLowerCase().includes(value))) {
      Notiflix.Notify.failure(`${value} is not in the contacts`);
    }
    dispatch(setFilter(value));
  };
  return (
    <div className={css.container}>
      <p className={css.title}>Find contacts by name</p>
      <input
        type="text"
        name="name"
        value={filter}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleFilter}
      />
    </div>
  );
};
