import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../redux/taskSlice";
import { Bell, Calendar, RotateCcw, X, Plus, Star, Save } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskDetails = ({ task, onClose }) => {
  const dispatch = useDispatch();
  const [editedTask, setEditedTask] = useState(task);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showRepeatOptions, setShowRepeatOptions] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [newStep, setNewStep] = useState("");

  if (!task || !editedTask) return null;

  const handleUpdateTask = () => {
    if (editedTask) {
      dispatch(updateTask(editedTask));
    }
  };

  const handleAddStep = () => {
    if (!newStep.trim()) return;

    const updatedTask = {
      ...editedTask,
      steps: [
        ...(editedTask.steps || []),
        { id: Date.now().toString(), title: newStep, completed: false },
      ],
    };
    setEditedTask(updatedTask);
    setNewStep("");
    dispatch(updateTask(updatedTask));
  };

  const handleToggleStep = (stepId) => {
    const updatedSteps = editedTask.steps?.map((step) =>
      step.id === stepId ? { ...step, completed: !step.completed } : step
    );
    const updatedTask = { ...editedTask, steps: updatedSteps };
    setEditedTask(updatedTask);
    dispatch(updateTask(updatedTask));
  };

  const handleDeleteStep = (stepId) => {
    const updatedSteps = editedTask.steps?.filter((step) => step.id !== stepId);
    const updatedTask = { ...editedTask, steps: updatedSteps };
    setEditedTask(updatedTask);
    dispatch(updateTask(updatedTask));
  };

  return (
    <div className="w-96 bg-white/5 h-screen border-l border-gray-600 p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Task Details</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-6">
        {/* Task Title */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={editedTask.completed}
            onChange={() =>
              setEditedTask({ ...editedTask, completed: !editedTask.completed })
            }
            className="w-5 h-5 rounded-full"
          />
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }
            className="flex-1 text-lg font-medium bg-transparent border-none focus:outline-none"
          />
          <button
            onClick={() =>
              setEditedTask({
                ...editedTask,
                isBookmarked: !editedTask.isBookmarked,
              })
            }
            className={`${
              editedTask.isBookmarked ? "text-yellow-500" : "text-gray-400"
            } hover:text-yellow-500`}
          >
            <Star size={20} />
          </button>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-500 pb-1">
            <Plus size={20} className="text-gray-500 hover:text-gray-400" />
            <input
              type="text"
              value={newStep}
              onChange={(e) => setNewStep(e.target.value)}
              placeholder="Add a step"
              className="flex-1 bg-transparent text-gray-500 hover:text-gray-400"
              onKeyPress={(e) => e.key === "Enter" && handleAddStep()}
            />
            <button onClick={handleAddStep}></button>
          </div>
          <div className="space-y-2">
            {editedTask.steps?.map((step) => (
              <div key={step.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={step.completed}
                  onChange={() => handleToggleStep(step.id)}
                  className="w-4 h-4"
                />
                <span
                  className={step.completed ? "line-through text-gray-500" : ""}
                >
                  {step.title}
                </span>
                <button
                  onClick={() => handleDeleteStep(step.id)}
                  className="ml-auto text-gray-400 hover:text-red-500"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Due Date */}
        <div className="space-y-2 border-b border-gray-500">
          <div className="flex items-center gap-2 pb-1">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-400"
            >
              <Calendar size={20} />
              {editedTask.dueDate
                ? new Date(editedTask.dueDate).toLocaleDateString()
                : "Add due date"}
            </button>
          </div>
          {showDatePicker && (
            <DatePicker
              selected={
                editedTask.dueDate ? new Date(editedTask.dueDate) : null
              }
              onChange={(date) => {
                setEditedTask({ ...editedTask, dueDate: date?.toISOString() });
                setShowDatePicker(false);
              }}
              inline
            />
          )}
        </div>

        {/* Reminder */}
        <div className="relative border-b border-gray-500 pb-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowReminder(!showReminder)}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-400"
            >
              <Bell size={20} />
              {editedTask.reminder || "Add reminder"}
            </button>
          </div>
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
                  onClick={() => {
                    setEditedTask({ ...editedTask, reminder: time });
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
        <div className="relative border-b border-gray-500 pb-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowRepeatOptions(!showRepeatOptions)}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-400"
            >
              <RotateCcw size={20} />
              {editedTask.repeat || "Never"}
            </button>
          </div>
          {showRepeatOptions && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-2 z-10">
              <select
                value={editedTask.repeat}
                onChange={(e) => {
                  setEditedTask({ ...editedTask, repeat: e.target.value });
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

        {/* Notes */}
        <div className="space-y-2 border-b border-gray-500">
          <textarea
            value={editedTask.notes}
            onChange={(e) =>
              setEditedTask({ ...editedTask, notes: e.target.value })
            }
            className="w-full h-16 p-3 bg-transparent"
            placeholder="Add notes..."
          />
        </div>

        <div className="py-12 text-sm text-gray-500">
          Created : {new Date(editedTask.createdAt).toLocaleDateString()}
        </div>

        {/* Save Button */}
        <button
          onClick={handleUpdateTask}
          className="w-full flex items-center justify-center gap-2 mt-8 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          <Save size={20} />
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
