import { Info } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const ProgressBar = () => {
  const tasks = useSelector((state) => state.tasks.tasks);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="mt-4 p-4 bg-white/5 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-lg font-semibold">Today Tasks</h3>
          <p className="text-3xl font-bold mt-1">{totalTasks}</p>
        </div>
        <div className="text-sm text-gray-400">
          <button className="hover:text-gray-600">
            <Info />
          </button>
        </div>
      </div>

      <div className="relative mt-2 mb-6">
        <svg className="w-32 h-32 mx-auto" viewBox="0 0 36 36">
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="4"
          />
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#22C55E"
            strokeWidth="4"
            strokeDasharray={`${progress}, 100`}
          />
        </svg>
        <div className="absolute pt-2 left-0 w-full flex justify-between text-sm text-gray-500">
          <div className="flex gap-1 items-center">
            <div className="w-2 h-2 bg-[#E5E7EB] rounded-full"></div>
            <span>Progress</span>
          </div>
          <div className="flex gap-1 items-center">
            <div className="w-2 h-2 bg-[#22C55E] rounded-full"></div>
            <span>Done</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
