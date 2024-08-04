import { configureStore } from '@reduxjs/toolkit';

import contactsReducer from './contactsSlice';
import filtersReducer from './filtersSlice';


// Комбинирование редьюсеров
const rootReducer = {
  contacts: contactsReducer,
  filters: filtersReducer,
};

// Настройка Redux store с редьюсерами
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export default store;