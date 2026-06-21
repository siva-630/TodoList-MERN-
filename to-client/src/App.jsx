import { useState, useEffect } from "react";
import Home from "./pages/Home";
// Import our API functions to talk to the backend database
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "./services/api";

// Helper function to show a friendly greeting based on the time of day
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Morning Focus";
  if (h < 17) return "Afternoon Focus";
  return "Evening Focus";
}

export default function App() {
  // State variables hold the dynamic data of our application.
  // Whenever these change, React automatically updates the screen.
  const [tasks, setTasks] = useState([]); // List of all our tasks
  const [input, setInput] = useState(""); // The text inside the "Create New Task" input box
  const [editingId, setEditingId] = useState(null); // Which task is currently being edited
  const [editText, setEditText] = useState(""); // The text inside the edit input box

  // useEffect runs code when the component first loads (because of the empty array [])
  useEffect(() => {
    // We create an async function inside because useEffect cannot be async directly
    async function loadTodos() {
      try {
        // Fetch tasks from our backend
        const data = await fetchTodos();
        // Transform the database format into the format our frontend expects
        const mappedTasks = data.map(todo => ({ 
          id: todo._id, 
          text: todo.title, 
          completed: todo.completed 
        }));
        // Save the fetched tasks into our state
        setTasks(mappedTasks);
      } catch (error) {
        console.error("Failed to fetch todos", error);
      }
    }
    
    // Call the function we just created to actually load the tasks
    loadTodos();
  }, []);

  // Calculate some stats to show the user their progress
  const remaining = tasks.filter((t) => !t.completed).length;
  const progress = tasks.length > 0 ? ((tasks.length - remaining) / tasks.length) * 100 : 0;

  // Function to add a brand new task
  async function addTask() {
    const trimmed = input.trim();
    // If the input is empty, don't do anything
    if (!trimmed) return;
    
    try {
      // 1. Tell the backend to create the task in the database
      const newTodo = await createTodo({ title: trimmed });
      // 2. Add the newly created task to our local state so it appears on screen
      setTasks((prev) => [...prev, { id: newTodo._id, text: newTodo.title, completed: newTodo.completed }]);
      // 3. Clear the input box
      setInput("");
    } catch (error) {
      console.error("Failed to add todo", error);
    }
  }

  // Function to mark a task as done or not done
  async function toggleTask(id) {
    // Find the task we want to toggle
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    try {
      // 1. Tell the backend to flip the 'completed' status
      const updatedTodo = await updateTodo(id, { completed: !task.completed });
      // 2. Update our local state with the new status
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: updatedTodo.completed } : t))
      );
    } catch (error) {
      console.error("Failed to toggle todo", error);
    }
  }

  // Function to completely remove a task
  async function handleDelete(id) {
    try {
      // 1. Tell the backend to delete the task from the database
      await deleteTodo(id);
      // 2. Remove the task from our local state so it disappears from the screen
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  }

  // Set up the state to start editing a task
  function startEdit(task) {
    setEditingId(task.id);
    setEditText(task.text);
  }

  // Save the changes made to an existing task
  async function saveEdit(id) {
    const trimmed = editText.trim();
    if (!trimmed) return;
    
    try {
      // 1. Tell the backend to update the task's title
      const updatedTodo = await updateTodo(id, { title: trimmed });
      // 2. Update our local state with the new text
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, text: updatedTodo.title } : t)));
      // 3. Exit edit mode
      setEditingId(null);
    } catch (error) {
      console.error("Failed to update todo", error);
    }
  }

  // Cancel editing without saving
  function cancelEdit() {
    setEditingId(null);
    setEditText("");
  }

  // We render the Home component and pass all our state and functions as "props"
  // so that the child components can use them.
  return (
    <Home
      greeting={getGreeting()}
      tasks={tasks}
      remaining={remaining}
      progress={progress}
      input={input}
      setInput={setInput}
      addTask={addTask}
      editingId={editingId}
      editText={editText}
      setEditText={setEditText}
      toggleTask={toggleTask}
      deleteTask={handleDelete}
      startEdit={startEdit}
      saveEdit={saveEdit}
      cancelEdit={cancelEdit}
    />
  );
}