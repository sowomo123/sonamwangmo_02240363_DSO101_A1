import { useState } from 'react';
import TaskItem from './components/TaskItem';
import TaskForm from './components/TaskForm';
import { Task, TaskFormData } from './types';

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Sample Task',
      description: 'This is a sample task to test the UI',
      status: 'pending',
      createdAt: new Date()
    }
  ]);
  const [loading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Add a new task
  const addTask = (taskData: TaskFormData) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description,
      status: taskData.status,
      createdAt: new Date()
    };
    setTasks([...tasks, newTask]);
    setIsFormOpen(false);
  };

  // Update an existing task
  const updateTask = (id: string, taskData: TaskFormData) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, title: taskData.title, description: taskData.description, status: taskData.status }
        : task
    ));
    setEditingTask(null);
    setIsFormOpen(false);
  };

  // Delete a task
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Toggle task status
  const toggleTaskStatus = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' }
        : task
    ));
  };

  // Open form for editing
  const openEditForm = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  // Close form
  const closeForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  // Filter tasks by status
  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">To-Do List</h1>
          <p className="text-gray-600">Manage your tasks efficiently</p>
        </header>

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error:</strong> {error}
            <button 
              onClick={() => setError(null)}
              className="float-right text-red-700 hover:text-red-900"
            >
              ×
            </button>
          </div>
        )}

        {/* Add Task Button */}
        <div className="mb-8 text-center">
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 shadow-md"
          >
            + Add New Task
          </button>
        </div>

        {/* Task Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <TaskForm
                task={editingTask}
                onSubmit={editingTask ? (data) => updateTask(editingTask.id, data) : addTask}
                onCancel={closeForm}
              />
            </div>
          </div>
        )}

        {/* Task Lists */}
        <div className="space-y-8">
          {/* Pending Tasks */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Pending Tasks ({pendingTasks.length})
            </h2>
            {pendingTasks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No pending tasks. Great job!</p>
            ) : (
              <div className="space-y-3">
                {pendingTasks.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onEdit={openEditForm}
                    onDelete={deleteTask}
                    onToggleStatus={toggleTaskStatus}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Completed Tasks */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Completed Tasks ({completedTasks.length})
            </h2>
            {completedTasks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No completed tasks yet.</p>
            ) : (
              <div className="space-y-3">
                {completedTasks.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onEdit={openEditForm}
                    onDelete={deleteTask}
                    onToggleStatus={toggleTaskStatus}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Built with React, TypeScript & Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
