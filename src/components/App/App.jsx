// Импорт необходимых библиотек и компонентов
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import SearchBox from '../SearchBox/SearchBox';
import ContactList from '../ContactList/ContactList';
import { fetchContacts, addContact, deleteContact } from '../../redux/contactsOps'; // Импорт асинхронных операций из contactsOps.js
import { selectFilteredContacts } from '../../redux/contactsSlice'; // Использование только selectFilteredContacts
import { changeFilter, selectNameFilter } from '../../redux/filtersSlice';

export default function App() {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  // Загрузка контактов при монтировании компонента
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = newContact => {
    dispatch(addContact(newContact)); // Добавление нового контакта
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId)); // Удаление контакта
  };

  const handleFilterChange = filter => {
    dispatch(changeFilter(filter)); // Изменение фильтра
  };

  const filteredContacts = useSelector(selectFilteredContacts); // Получение фильтрованных контактов

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAdd={handleAddContact} />
      <SearchBox value={filter} onFind={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDelete={handleDeleteContact} />
    </div>
  );
}