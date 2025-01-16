import React from "react";
import { useDispatch } from "react-redux";
import { Star } from "lucide-react";
import { toggleTask, deleteTask } from "../redux/taskSlice";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between p-4 bg-primary border-b border-gray-700 shadow-sm">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => dispatch(toggleTask(task.id))}
          className="w-5 h-5 rounded-full border-2 border-primary bg-white/5 checked:bg-green-600"
        />
        <span
          className={`${
            task.completed ? "line-through text-primary" : "text-gray-600"
          }`}
        >
          {task.title}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          className={`${
            task.priority === "high" ? "text-yellow-500" : "text-gray-500"
          } hover:text-yellow-500`}
        >
          <Star size={20} />
        </button>
        <button
          onClick={() => dispatch(deleteTask(task.id))}
          className="text-black/10 hover:text-red-500"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default TaskItem;