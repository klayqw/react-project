import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export const tasksSlice = createSlice({
 name: 'tasks',
 initialState: [],
 reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      return state.filter(task => task.id !== action.payload);
    },
    updateTask: (state, action) => {
      return state.map(task =>
        task.id === action.payload.id ? action.payload : task
      );
    },
 },
});

export const { addTask, deleteTask, updateTask } = tasksSlice.actions;



export default tasksSlice.reducer;
