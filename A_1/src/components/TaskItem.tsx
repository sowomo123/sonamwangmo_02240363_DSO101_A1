import React from 'react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const isCompleted = task.status === 'completed';

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 transition-all duration-200 ${
      isCompleted ? 'opacity-75' : 'hover:shadow-lg'
    }`}>
      <div className="flex items-start justify-between">
        {/* Task Content */}
        <div className="flex-1 mr-4">
          <div className="flex items-center mb-2">
            {/* Status Checkbox */}
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={() => onToggleStatus(task.id)}
              className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-400 mr-3 cursor-pointer"
            />
            
            {/* Task Title */}
            <h3 className={`text-lg font-medium ${
              isCompleted ? 'text-gray-500 line-through' : 'text-gray-800'
            }`}>
              {task.title}
            </h3>
          </div>
          
          {/* Task Description */}
          {task.description && (
            <p className={`text-sm ${
              isCompleted ? 'text-gray-400' : 'text-gray-600'
            } ml-8`}>
              {task.description}
            </p>
          )}
          
          {/* Task Meta */}
          <div className="text-xs text-gray-400 ml-8 mt-2">
            Created: {task.createdAt.toLocaleDateString()}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="text-blue-500 hover:text-blue-700 transition duration-150"
            title="Edit task"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 hover:text-red-700 transition duration-150"
            title="Delete task"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
