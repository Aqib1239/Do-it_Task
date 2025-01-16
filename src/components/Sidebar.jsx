import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../redux/taskSlice";
import { logout } from "../redux/authSlice";
import {
  ListTodo,
  Calendar,
  Star,
  Layout,
  Users,
  LogOut,
  Settings,
  User,
  PlusIcon
} from "lucide-react";
import ProgressBar from "./ProgressBar";

const Sidebar = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.tasks.filter);
  const user = useSelector((state) => state.auth.user);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setShowUserMenu(false);
    // Clear local storage
    localStorage.removeItem("user");
    localStorage.removeItem("tasks");
  };

  return (
    <div className="w-80 bg- border-l border-gray-600 h-screen p-5 flex flex-col z-10">
      <div className="relative">
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex flex-col mx-auto items-center gap-3 mb-1 w-full hover:bg-primary p-2 rounded-lg"
        >
          <img
            src={
              "https://img.icons8.com/?size=100&id=8VXh2TzKXNG8&format=png&color=000000/40"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full border-4"
          />
          <div className="flex-1 text-left">
            <h2 className="font-medium">Hey, {user?.name || "User"}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </button>

        {showUserMenu && (
          <div className="absolute top-24 left-48 w-full bg-white dark:bg-black text-primary rounded-lg shadow-lg py-2 z-40">
            <button
              className="flex items-center gap-2 w-full px-4 py-2 hover:bg-primary/10 text-primary"
              onClick={() => setShowUserMenu(false)}
            >
              <User size={16} />
              <span>Profile</span>
            </button>
            <button
              className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-500 text-primary"
              onClick={() => setShowUserMenu(false)}
            >
              <Settings size={16} />
              <span>Settings</span>
            </button>
            <hr className="my-2" />
            <button
              className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-500 text-primary"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>

      <nav className="space-y-0 bg-white/5 p-4 rounded-lg">
        <button
          onClick={() => dispatch(setFilter("all"))}
          className={`flex items-center gap-3 w-full p-2 rounded-lg ${
            filter === "all" ? "bg-green-900 text-green-600" : "text-primary"
          }`}
        >
          <ListTodo size={20} />
          <span>All Tasks</span>
        </button>
        <button
          onClick={() => dispatch(setFilter("today"))}
          className={`flex items-center gap-3 w-full p-2 rounded-lg ${
            filter === "today" ? "bg-green-900 text-green-600" : "text-primary"
          }`}
        >
          <Calendar size={20} />
          <span>Today</span>
        </button>
        <button
          onClick={() => dispatch(setFilter("important"))}
          className={`flex items-center gap-3 w-full p-2 rounded-lg ${
            filter === "important"
              ? "bg-green-900 text-green-600"
              : "text-primary"
          }`}
        >
          <Star size={20} />
          <span>Important</span>
        </button>
        <button
          onClick={() => dispatch(setFilter("planned"))}
          className={`flex items-center gap-3 w-full p-2 rounded-lg ${
            filter === "planned"
              ? "bg-green-900 text-green-600"
              : "text-primary"
          }`}
        >
          <Layout size={20} />
          <span>Planned</span>
        </button>
        <button
          onClick={() => dispatch(setFilter("assigned"))}
          className={`flex items-center gap-3 w-full p-2 rounded-lg ${
            filter === "assigned"
              ? "bg-green-900 text-green-600"
              : "text-primary"
          }`}
        >
          <Users size={20} />
          <span>Assigned to me</span>
        </button>
      </nav>

      <div className="mt-3 bg-white/5 p-4 rounded-lg">
        <button className="px-2 flex items-center gap-2 text-primary hover:text-green-600">
          <PlusIcon size={20} />
          <span>Add list</span>
        </button>
      </div>

      <ProgressBar />
    </div>
  );
};

export default Sidebar;