import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Bell, RotateCcw, Calendar, ChevronDown } from "lucide-react";
import { addTask } from "../redux/taskSlice";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskInput = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dueDate, setDueDate] = useState(null);
  const [showRepeatOptions, setShowRepeatOptions] = useState(false);
  const [repeat, setRepeat] = useState("never");
  const [showReminder, setShowReminder] = useState(false);
  const [reminder, setReminder] = useState("none");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: uuidv4(),
      title: title.trim(),
      completed: false,
      priority: "medium",
      createdAt: new Date().toISOString(),
      dueDate: dueDate?.toISOString(),
      repeat,
      reminder,
      isBookmarked: false,
      notes: "",
      steps: [],
    };

    dispatch(addTask(newTask));
    setTitle("");
    setDueDate(null);
    setRepeat("never");
    setReminder("none");
    setShowDatePicker(false);
    setShowRepeatOptions(false);
    setShowReminder(false);
  };

  return (
    <div className="bg-primary pl-1 pr-4 shadow-sm ">
      <div className="mb-4">
        <div className="flex pb-1 text-green-600">
          <p>Todo</p>
          <div className="mt-1.5">
            <ChevronDown size={18} />
          </div>
        </div>
        <div className="w-full border-b border-gray-700 "></div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white/5 p-4 rounded-lg"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add A Task"
          className="w-full p-2 border-none bg-transparent focus:outline-none text-primary"
        />
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            {/* Reminder */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowReminder(!showReminder)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Bell size={20} />
              </button>
              {showReminder && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-2 z-10">
                  {[
                    "5 minutes before",
                    "30 minutes before",
                    "1 hour before",
                    "1 day before",
                  ].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => {
                        setReminder(time);
                        setShowReminder(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Repeat */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowRepeatOptions(!showRepeatOptions)}
                className="text-gray-500 hover:text-gray-700"
              >
                <RotateCcw size={20} />
              </button>
              {showRepeatOptions && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-2 z-10">
                  <select
                    value={repeat}
                    onChange={(e) => {
                      setRepeat(e.target.value);
                      setShowRepeatOptions(false);
                    }}
                    className="w-full p-2 border rounded"
                  >
                    <option value="never">Never</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              )}
            </div>
            {/* Date Picker */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Calendar size={20} />
              </button>
              {showDatePicker && (
                <div className="absolute top-full left-0 mt-2 z-10">
                  <DatePicker
                    selected={dueDate}
                    onChange={(date) => {
                      setDueDate(date);
                      setShowDatePicker(false);
                    }}
                    inline
                  />
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="px-2 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            ADD TASK
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskInput;