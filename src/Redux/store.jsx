import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './Slices/todoSlice'; // Adjust the path based on your structure

export const store = configureStore({
  reducer: {
    todos: todoSlice,
  },
});
