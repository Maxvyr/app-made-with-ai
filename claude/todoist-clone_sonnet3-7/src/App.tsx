import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Plus,
  Trash2,
  ArrowDownAZ,
  CalendarDays,
  CheckCircle,
  X,
  Moon,
  Sun,
} from "lucide-react";

// Define task type
interface Task {
  id: string;
  description: string;
  dueDate: string;
  priority: "P1" | "P2" | "P3" | "P4";
  completed: boolean;
}

// Priority colors mapping
const priorityColors = {
  P1: "bg-red-500",
  P2: "bg-orange-500",
  P3: "bg-blue-500",
  P4: "bg-gray-400",
};

// Priority labels
const priorityLabels = {
  P1: "High",
  P2: "Medium",
  P3: "Normal",
  P4: "Low",
};

// Priority order for sorting (P1 is highest)
const priorityOrder = {
  P1: 1,
  P2: 2,
  P3: 3,
  P4: 4,
};

// Date filter types
type DateFilter = "all" | "today" | "upcoming";

function App() {
  // State for tasks and form inputs
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<"P1" | "P2" | "P3" | "P4">("P4");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Add a new task
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim() === "") return;

    const newTask: Task = {
      id: Date.now().toString(),
      description,
      dueDate,
      priority,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setDescription("");
    setDueDate("");
    setPriority("P4");
  };

  // Delete a task
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle task completion
  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Check if a date is today
  const isToday = (dateString: string) => {
    if (!dateString) return false;
    const today = new Date();
    const taskDate = new Date(dateString);
    return (
      taskDate.getDate() === today.getDate() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getFullYear() === today.getFullYear()
    );
  };

  // Check if a date is upcoming (future date, not today)
  const isUpcoming = (dateString: string) => {
    if (!dateString) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const taskDate = new Date(dateString);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate > today;
  };

  // Filter tasks based on date filter
  const filterTasksByDate = (tasks: Task[]) => {
    switch (dateFilter) {
      case "today":
        return tasks.filter((task) => isToday(task.dueDate));
      case "upcoming":
        return tasks.filter((task) => isUpcoming(task.dueDate));
      default:
        return tasks;
    }
  };

  // Get completed tasks
  const completedTasks = filterTasksByDate([...tasks])
    .filter((task) => task.completed)
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  // Get active (non-completed) tasks
  const activeTasks = filterTasksByDate([...tasks])
    .filter((task) => !task.completed)
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  // Count completed tasks
  const completedTasksCount = completedTasks.length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-800 dark:text-dark-text">
      <div className="max-w-3xl mx-auto p-4">
        <header className="py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-dark-text">
            Todoist Clone
          </h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-dark-card hover:bg-gray-300 dark:hover:bg-dark-border transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700" />
            )}
          </button>
        </header>

        {/* Add Task Form */}
        <form
          onSubmit={addTask}
          className="mb-8 bg-white dark:bg-dark-card p-4 rounded-lg shadow-sm dark:shadow-none dark:border dark:border-dark-border"
        >
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a task..."
              className="w-full p-2 border border-gray-300 dark:border-dark-border rounded focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-dark-accent bg-white dark:bg-dark-card dark:text-dark-text"
            />

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-500 dark:text-dark-muted mr-2" />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="p-2 border border-gray-300 dark:border-dark-border rounded focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-dark-accent bg-white dark:bg-dark-card dark:text-dark-text"
                />
              </div>

              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-500 dark:text-dark-muted mr-2" />
                <select
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value as "P1" | "P2" | "P3" | "P4")
                  }
                  className="p-2 border border-gray-300 dark:border-dark-border rounded focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-dark-accent bg-white dark:bg-dark-card dark:text-dark-text"
                >
                  <option value="P1">P1 - High</option>
                  <option value="P2">P2 - Medium</option>
                  <option value="P3">P3 - Normal</option>
                  <option value="P4">P4 - Low</option>
                </select>
              </div>

              <button
                type="submit"
                className="flex items-center bg-red-500 dark:bg-dark-accent text-white px-4 py-2 rounded hover:bg-red-600 dark:hover:bg-red-700 transition-colors"
              >
                <Plus className="h-5 w-5 mr-1" />
                Add Task
              </button>
            </div>
          </div>
        </form>

        {/* Date Filter Buttons */}
        <div className="mb-4 flex space-x-2">
          <button
            onClick={() => setDateFilter("all")}
            className={`px-4 py-2 rounded-md flex items-center ${
              dateFilter === "all"
                ? "bg-red-500 dark:bg-dark-accent text-white"
                : "bg-white dark:bg-dark-card text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-border"
            }`}
          >
            <CalendarDays className="h-4 w-4 mr-2" />
            All
          </button>
          <button
            onClick={() => setDateFilter("today")}
            className={`px-4 py-2 rounded-md flex items-center ${
              dateFilter === "today"
                ? "bg-red-500 dark:bg-dark-accent text-white"
                : "bg-white dark:bg-dark-card text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-border"
            }`}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Today
          </button>
          <button
            onClick={() => setDateFilter("upcoming")}
            className={`px-4 py-2 rounded-md flex items-center ${
              dateFilter === "upcoming"
                ? "bg-red-500 dark:bg-dark-accent text-white"
                : "bg-white dark:bg-dark-card text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-border"
            }`}
          >
            <Clock className="h-4 w-4 mr-2" />
            Upcoming
          </button>
        </div>

        {/* Tasks List Header */}
        {tasks.length > 0 && (
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-medium text-gray-700 dark:text-dark-text">
              {dateFilter === "all"
                ? "All Tasks"
                : dateFilter === "today"
                ? "Today's Tasks"
                : "Upcoming Tasks"}
            </h2>
            <div className="flex items-center text-sm text-gray-600 dark:text-dark-muted">
              <ArrowDownAZ className="h-4 w-4 mr-1" />
              <span>Sorted by priority (highest first)</span>
            </div>
          </div>
        )}

        {/* Active Tasks List */}
        <div className="space-y-2">
          {activeTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-dark-muted">
              {tasks.length === 0
                ? "No tasks yet. Add a task to get started!"
                : tasks.some((task) => !task.completed)
                ? `No ${
                    dateFilter === "today"
                      ? "tasks for today"
                      : "upcoming tasks"
                  } found.`
                : "All tasks are completed!"}
            </div>
          ) : (
            activeTasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-start p-4 bg-white dark:bg-dark-card rounded-lg shadow-sm dark:shadow-none dark:border dark:border-dark-border border-l-4 ${
                  priorityColors[task.priority]
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  className="mt-1 mr-3 h-5 w-5 rounded border-gray-300 dark:border-dark-border text-red-500 dark:text-dark-accent focus:ring-red-500 dark:focus:ring-dark-accent"
                />
                <div className="flex-1">
                  <p
                    className={`text-gray-800 dark:text-dark-text ${
                      task.completed
                        ? "line-through text-gray-500 dark:text-dark-muted"
                        : ""
                    }`}
                  >
                    {task.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2 text-sm">
                    {task.dueDate && (
                      <span className="flex items-center text-gray-500 dark:text-dark-muted">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(task.dueDate)}
                      </span>
                    )}
                    <span className="flex items-center text-gray-500 dark:text-dark-muted">
                      <Clock className="h-4 w-4 mr-1" />
                      {priorityLabels[task.priority]}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-400 dark:text-dark-muted hover:text-red-500 dark:hover:text-dark-accent transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Show Completed Tasks Button */}
        {completedTasksCount > 0 && (
          <button
            onClick={() => setShowCompletedModal(true)}
            className="mt-6 w-full py-2 bg-gray-100 dark:bg-dark-card text-gray-700 dark:text-dark-text rounded-md flex items-center justify-center hover:bg-gray-200 dark:hover:bg-dark-border transition-colors"
          >
            <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
            Show {completedTasksCount} completed{" "}
            {completedTasksCount === 1 ? "task" : "tasks"}
          </button>
        )}

        {/* Completed Tasks Modal */}
        {showCompletedModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-dark-card rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
              <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-dark-border">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-dark-text">
                  Completed Tasks
                </h3>
                <button
                  onClick={() => setShowCompletedModal(false)}
                  className="text-gray-500 dark:text-dark-muted hover:text-gray-700 dark:hover:text-dark-text"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="overflow-y-auto p-4 flex-1">
                {completedTasks.length === 0 ? (
                  <p className="text-center text-gray-500 dark:text-dark-muted py-8">
                    No completed tasks found.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {completedTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`flex items-start p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border border-l-4 ${
                          priorityColors[task.priority]
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleComplete(task.id)}
                          className="mt-1 mr-3 h-5 w-5 rounded border-gray-300 dark:border-dark-border text-red-500 dark:text-dark-accent focus:ring-red-500 dark:focus:ring-dark-accent"
                        />
                        <div className="flex-1">
                          <p className="text-gray-800 dark:text-dark-text line-through">
                            {task.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-2 text-sm">
                            {task.dueDate && (
                              <span className="flex items-center text-gray-500 dark:text-dark-muted">
                                <Calendar className="h-4 w-4 mr-1" />
                                {formatDate(task.dueDate)}
                              </span>
                            )}
                            <span className="flex items-center text-gray-500 dark:text-dark-muted">
                              <Clock className="h-4 w-4 mr-1" />
                              {priorityLabels[task.priority]}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-gray-400 dark:text-dark-muted hover:text-red-500 dark:hover:text-dark-accent transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-gray-200 dark:border-dark-border">
                <button
                  onClick={() => setShowCompletedModal(false)}
                  className="w-full py-2 bg-gray-100 dark:bg-dark-border text-gray-700 dark:text-dark-text rounded-md hover:bg-gray-200 dark:hover:bg-dark-border/80 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
