import { useState, useEffect } from "react";
import Home from "./pages/Home";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "./services/api";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Morning Focus";
  if (h < 17) return "Afternoon Focus";
  return "Evening Focus";
}

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await fetchTodos();
      const mappedTasks = data.map(todo => ({ id: todo._id, text: todo.title, completed: todo.completed }));
      setTasks(mappedTasks);
    } catch (error) {
      console.error("Failed to fetch todos", error);
    }
  };

  const remaining = tasks.filter((t) => !t.completed).length;
  const progress = tasks.length > 0 ? ((tasks.length - remaining) / tasks.length) * 100 : 0;

  async function addTask() {
    const trimmed = input.trim();
    if (!trimmed) return;
    try {
      const newTodo = await createTodo({ title: trimmed });
      setTasks((prev) => [...prev, { id: newTodo._id, text: newTodo.title, completed: newTodo.completed }]);
      setInput("");
    } catch (error) {
      console.error("Failed to add todo", error);
    }
  }

  async function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    try {
      const updatedTodo = await updateTodo(id, { completed: !task.completed });
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: updatedTodo.completed } : t))
      );
    } catch (error) {
      console.error("Failed to toggle todo", error);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTodo(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  }

  function startEdit(task) {
    setEditingId(task.id);
    setEditText(task.text);
  }

  async function saveEdit(id) {
    const trimmed = editText.trim();
    if (!trimmed) return;
    try {
      const updatedTodo = await updateTodo(id, { title: trimmed });
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, text: updatedTodo.title } : t)));
      setEditingId(null);
    } catch (error) {
      console.error("Failed to update todo", error);
    }
  }

  function cancelEdit() {
    setEditingId(null);
    setEditText("");
  }

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