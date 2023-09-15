import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',
  initialState: null, // El estado inicial es nulo, lo que significa que inicialmente no hay categoría seleccionada
  reducers: {
    setCategory: (state, action) => {
      return action.payload; // Establece el estado de la categoría según la acción
    },
  },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
