// Импорт необходимых библиотек и асинхронных операций
import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './contactsOps'; // Импорт асинхронных операций из contactsOps.js
import { createSelector } from 'reselect';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    // Добавлены обработчики для асинхронных операций
    builder
      .addCase(fetchContacts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addContact.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteContact.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Селекторы для получения контактов и фильтрованных контактов
export const selectContacts = state => state.contacts.items;

export const selectFilteredContacts = createSelector(
  [selectContacts, state => state.filters.name],
  (contacts, filter) =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    )
);

export default contactsSlice.reducer;
