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
      state.splice(action.payload,1);
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
