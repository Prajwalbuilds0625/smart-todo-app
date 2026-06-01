import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    list: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.list.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },

    deleteTask: (state, action) => {
      state.list = state.list.filter(
        (task) => task.id !== action.payload
      );
    },

    toggleTask: (state, action) => {
      const task = state.list.find(
        (task) => task.id === action.payload
      );

      if (task) {
        task.completed = !task.completed;
      }
    },

    editTask: (state, action) => {
      const task = state.list.find(
        (task) => task.id === action.payload.id
      );

      if (task) {
        task.text = action.payload.text;
      }
    },
  },
});

export const {
  addTask,
  deleteTask,
  toggleTask,
  editTask,
} = taskSlice.actions;

export default taskSlice.reducer;