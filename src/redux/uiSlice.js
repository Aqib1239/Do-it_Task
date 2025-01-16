import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: false,
  isCardView: false,
  sidebarOpen: true,
  selectedTaskId: null,
  searchQuery: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    toggleViewMode: (state) => {
      state.isCardView = !state.isCardView;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSelectedTask: (state, action) => {
      state.selectedTaskId = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { toggleDarkMode, toggleViewMode, toggleSidebar, setSelectedTask, setSearchQuery } =
  uiSlice.actions;
export default uiSlice.reducer;
