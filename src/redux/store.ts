import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice'; // Importa el slice o reducer para la categoría

export const store = configureStore({
  reducer: {
    category: categoryReducer, 
    // Otros reducers pueden ir aquí si es necesario
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
