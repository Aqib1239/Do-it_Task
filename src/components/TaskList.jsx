import React from "react";
import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";

const TaskList = ({ onTaskClick }) => {
  const { tasks, filter, view, searchQuery } = useSelector(
    (state) => state.tasks
  );
  const { user } = useSelector((state) => state.auth);

  const filteredTasks = tasks.filter((task) => {
    // Apply search filter
    if (
      searchQuery &&
      !task.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Apply category filter
    switch (filter) {
      case "today":
        return (
          new Date(task.createdAt).toDateString() === new Date().toDateString()
        );
      case "important":
        return task.isBookmarked;
      case "planned":
        return task.dueDate !== undefined;
      case "assigned":
        return task.assignedTo === user?.id;
      default:
        return true;
    }
  });

  const pendingTasks = filteredTasks.filter((task) => !task.completed);
  const completedTasks = filteredTasks.filter((task) => task.completed);

  const TaskWrapper = ({ task }) => {
    if (view === "card") {
      return (
        <div
          className="bg-primary text-primary p-4 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onTaskClick(task.id)}
        >
          <TaskItem task={task} />
        </div>
      );
    }
    return (
      <div onClick={() => onTaskClick(task.id)} className="cursor-pointer">
        <TaskItem task={task} />
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div
        className={
          view === "card"
            ? "grid grid-cols-1 md:grid-cols-2 gap-4"
            : "space-y-2"
        }
      >
        {pendingTasks.map((task) => (
          <TaskWrapper key={task.id} task={task} />
        ))}
      </div>

      {completedTasks.length > 0 && (
        <>
          <h3 className="text-gray-500 dark:text-gray-400 font-medium mt-6 mb-2">
            Completed
          </h3>
          <div
            className={
              view === "card"
                ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                : "space-y-2"
            }
          >
            {completedTasks.map((task) => (
              <TaskWrapper key={task.id} task={task} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskList;