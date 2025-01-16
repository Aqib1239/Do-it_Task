import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleDarkMode,
  toggleViewMode,
  toggleSidebar,
  setSearchQuery,
} from "../redux/uiSlice";
import { Search, Grid3X3, Moon, List, Menu } from "lucide-react";

export default function Header() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
  const isCardView = useSelector((state) => state.ui.isCardView);
  const searchQuery = useSelector((state) => state.ui.searchQuery);

  return (
    <header className="h-16 border-b bg-white dark:bg-gray-800 flex items-center justify-between px-4">
      <div className="flex items-center">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="ml-4">
          <svg
            width="80"
            height="32"
            viewBox="0 0 80 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 16C0 7.16344 7.16344 0 16 0H64C72.8366 0 80 7.16344 80 16V16C80 24.8366 72.8366 32 64 32H16C7.16344 32 0 24.8366 0 16V16Z"
              className="fill-green-500"
            />
            <text x="20" y="22" fill="white" className="text-xl font-bold">
              DoIt
            </text>
          </svg>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <button
          onClick={() => dispatch(toggleViewMode())}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          {isCardView ? (
            <List className="w-5 h-5" />
          ) : (
            <Grid3X3 className="w-5 h-5" />
          )}
        </button>
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <Moon className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
