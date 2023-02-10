import css from './ContactList.module.css';
import PropTypes from 'prop-types';

export const ContactList = ({ contactsData, deleteContact }) => {
  return (
    <div className={css.container}>
      <ul className={css.list}>
        {contactsData.map(({ id, name, number }) => (
          <li className={css.listItem} key={id}>
            <span className={css.name}>{name}:</span>
            <span className={css.number}>{number}</span>
            <button
              className={css.deleteBtn}
              onClick={() => {
                deleteContact(id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  contactsData: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
