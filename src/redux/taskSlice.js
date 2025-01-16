import { createSlice } from "@reduxjs/toolkit";

const storedTasks = localStorage.getItem("tasks");
const initialTasks = storedTasks ? JSON.parse(storedTasks) : [];

const initialState = {
  tasks: initialTasks,
  loading: false,
  error: null,
  filter: "all",
  view: "list",
  searchQuery: "",
  selectedTaskId: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setView: (state, action) => {
      state.view = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedTaskId: (state, action) => {
      state.selectedTaskId = action.payload;
    },
    toggleBookmark: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.isBookmarked = !task.isBookmarked;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
  },
});

export const {
  addTask,
  toggleTask,
  updateTask,
  deleteTask,
  setFilter,
  setView,
  setSearchQuery,
  setSelectedTaskId,
  toggleBookmark,
} = taskSlice.actions;

export default taskSlice.reducer;
