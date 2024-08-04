import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import contactsReducer from './contactsSlice';
import filtersReducer from './filtersSlice';

// Настройка persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['contacts'],
};

// Комбинирование редьюсеров
const rootReducer = combineReducers({
  contacts: persistReducer(persistConfig, contactsReducer),
  filters: filtersReducer,
});

// Настройка Redux store с редьюсерами
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Игнорируем предупреждения о несериализуемых значениях в действиях
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['register'],
      },
    }),
});
const persistor = persistStore(store);

export { store, persistor };