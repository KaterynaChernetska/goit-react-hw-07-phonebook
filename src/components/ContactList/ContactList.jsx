import css from './ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, fetchContacts } from 'redux/operations';
import { useEffect } from 'react';
import {Loader} from '../Loader/Loader';
import { selectLoader, selectError,selectFilteredContacts } from 'redux/selectors';

export const ContactList = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoader);
  const error = useSelector(selectError);

  const filteredContacts = useSelector(selectFilteredContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.container}>
   
      <ul className={css.list}>
      {error && <p>Oops, some error occured... Message: {error}</p>}
      {isLoading ? <Loader/> : filteredContacts.map(({ id, name, phone }) => (
          <li className={css.listItem} key={id}>
            <span className={css.name}>{name}:</span>
            <span className={css.number}>{phone}</span>
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
