import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Sidebar from "./components/Sidebar";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import TaskDetails from "./components/TaskDetails";
import { Search, Grid3X3, LayoutGrid, Moon, Sun, Menu } from "lucide-react";
import { setView, setSearchQuery, setSelectedTaskId } from "./redux/taskSlice";

function AppContent() {
  const dispatch = useDispatch();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const view = useSelector((state) => state.tasks.view);
  const selectedTaskId = useSelector((state) => state.tasks.selectedTaskId);
  const tasks = useSelector((state) => state.tasks.tasks);
  const selectedTask = tasks.find((task) => task.id === selectedTaskId);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      ...(isDarkMode
        ? {
            primary: { main: "#bb86fc" },
            background: { default: "#121212", paper: "#1f1f1f" },
            text: { primary: "#ffffff", secondary: "#a1a1a1" },
          }
        : {
            primary: { main: "#6200ee" },
            background: { default: "#e3e3e3", paper: "#ffffff" },
            text: { primary: "#000000", secondary: "#4f4f4f" },
          }),
    },
    typography: { fontFamily: "Arial, sans-serif" },
  });

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (selectedTask) {
      dispatch(setSelectedTaskId(null)); // Close TaskDetails if the sidebar is opened
    }
  };

  const toggleTaskDetails = (taskId) => {
    if (selectedTaskId === taskId) {
      dispatch(setSelectedTaskId(null)); // Close TaskDetails if already selected
    } else {
      dispatch(setSelectedTaskId(taskId));
      setIsSidebarOpen(false); // Close Sidebar when TaskDetails is opened
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="flex min-h-screen">
        {/* Hamburger Menu */}
        <button
          onClick={toggleSidebar}
          className="fixed flex gap-4 top-2 left-4 z-50 text-primary"
        >
          <Menu size={24} />
          <h1>Logo</h1>
        </button>

        {/* Sidebar */}
        <div
          className={`fixed md:relative z-40 h-full bg-white/5 transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } w-80`}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "relative ml-1 w-full" : "absolute ml-0 w-full"
          } ${selectedTask ? "relative mr-96" : "absolute mr-0"}`}
        >
          <div className="max-w-full px-4">
            <header className="flex justify-end gap-4 items-center mb-8 mt-4">
              <div className="relative flex items-center gap-2 max-w-md">
                <Search
                  className="text-gray-500 ml-8 cursor-pointer"
                  size={20}
                  onClick={() => setIsSearchVisible(!isSearchVisible)}
                />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  className={`transition-all duration-300 ease-in-out pl-2 pr-4 py-2 rounded-lg border border-gray-500 focus:outline-none focus:border-green-500 bg-white/10 text-gray-700 ${`
                    isSearchVisible
                      ? "w-full opacity-100"
                      : "w-0 opacity-0 pointer-events-none"
                  `}`}
                />
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    dispatch(setView(view === "list" ? "card" : "list"))
                  }
                  className="text-gray-600 hover:text-gray-400"
                >
                  {view === "list" ? (
                    <LayoutGrid size={20} />
                  ) : (
                    <Grid3X3 size={20} />
                  )}
                </button>
                <button
                  onClick={toggleDarkMode}
                  className="text-gray-600 hover:text-gray-400"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </header>

            <TaskInput />
            <div className="mt-8">
              <TaskList onTaskClick={(taskId) => toggleTaskDetails(taskId)} />
            </div>
          </div>
        </main>

        {/* Task Details */}
        {selectedTask && (
          <div
            className={`fixed right-0 top-14 h-full bg-white/5 transition-transform duration-300 ease-in-out ${
              selectedTask ? "translate-x-0" : "translate-x-full"
            } w-76`}
          >
            <TaskDetails
              task={selectedTask}
              onClose={() => dispatch(setSelectedTaskId(null))}
            />
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default AppContent;