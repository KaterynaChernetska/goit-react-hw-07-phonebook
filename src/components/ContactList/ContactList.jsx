import css from './ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';

export const ContactList = () => {
  const dispatch = useDispatch();

  const filteredContacts = useSelector(state => {
    return state.contactsData.contacts.filter(({ name }) =>
      name.toLowerCase().includes(state.contactsData.filter.toLowerCase())
    );
  });

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {filteredContacts.map(({ id, name, number }) => (
          <li className={css.listItem} key={id}>
            <span className={css.name}>{name}:</span>
            <span className={css.number}>{number}</span>
            <button
              className={css.deleteBtn}
              onClick={() => dispatch(deleteContact(id))}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
