import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter((_, i) => i !== action.payload);
    },
    updateTodo: (state, action) => {
      const { index, updatedText } = action.payload;
      state.items = state.items.map((item, i) => (i === index ? updatedText : item));
    },
    clearAllTodos: (state) => {
      state.items = [];
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, clearAllTodos } = todoSlice.actions;

export default todoSlice.reducer;
