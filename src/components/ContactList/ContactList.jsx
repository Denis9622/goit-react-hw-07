// Импорт необходимых библиотек и компонентов
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts, deleteContact } from '../../redux/contactsOps'; // Импорт асинхронных операций из contactsOps.js
import { selectFilteredContacts } from '../../redux/contactsSlice';
import Contact from '../Contact/Contact';
import css from './ContactList.module.css';

export default function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const loading = useSelector(state => state.contacts.loading); // Получение состояния загрузки
  const error = useSelector(state => state.contacts.error); // Получение состояния ошибки

  // Загрузка контактов при монтировании компонента
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDelete = id => {
    dispatch(deleteContact(id)); // Удаление контакта по ID
  };

  if (loading) return <p>Loading...</p>; // Отображение индикатора загрузки
  if (error) return <p>Error: {error}</p>; // Отображение сообщения об ошибке

  return (
    <ul className={css.list}>
      {contacts.map(contact => (
        <li key={contact.id}>
          <Contact data={contact} onDelete={handleDelete} />
        </li>
      ))}
    </ul>
  );
}
