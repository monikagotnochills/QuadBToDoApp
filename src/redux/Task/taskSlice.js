import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    updateTask(state, action) {
      const { id, updatedTask } = action.payload;
      console.log(id, updatedTask, "id, updated task");
      const index = state.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },
    deleteTask(state, action) {
      const id = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
  },
});

export const { addTask, updateTask, deleteTask } = taskSlice.actions;

// Selector for filtering completed tasks
// export const selectCompletedTasks = (state) =>
//   state.tasks.filter((task) => task.completed);

export const selectCompletedTasks = createSelector(
  (state) => state.tasks,
  (tasks) => tasks.filter((task) => task.completed)
);

// // Selector for filtering important tasks
// export const selectImportantTasks = (state) =>
//   state.tasks.filter((task) => task.important);

// export const selectToDoTasks = (state) =>
//   state.tasks.filter((task) => !task.completed);

export const selectToDoTasks = createSelector(
  (state) => state.tasks,
  (tasks) => tasks.filter((task) => !task.completed)
);

export const selectImportantTasks = createSelector(
  (state) => state.tasks,
  (tasks) => tasks.filter((task) => task.important)
);

export default taskSlice.reducer;
