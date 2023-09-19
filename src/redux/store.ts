import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice'; // Importa el slice o reducer para la categoría
import articleSlice from './articleSlice';

export const store = configureStore({
  reducer: {
    category: categoryReducer, 
    article: articleSlice
    // Otros reducers pueden ir aquí si es necesario
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
