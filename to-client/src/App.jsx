import { useState } from "react";
import Home from "./pages/Home";

const INITIAL_TASKS = [
  { id: 1, text: "Review Quarterly Q3 Report", completed: false },
  { id: 2, text: "Design system overhaul", completed: false },
  { id: 3, text: "Sync with development team", completed: false },

];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Morning Focus";
  if (h < 17) return "Afternoon Focus";
  return "Evening Focus";
}

export default function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const remaining = tasks.filter((t) => !t.completed).length;
  const progress = tasks.length > 0 ? ((tasks.length - remaining) / tasks.length) * 100 : 0;

  function addTask() {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTasks((prev) => [...prev, { id: Date.now(), text: trimmed, completed: false }]);
    setInput("");
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function startEdit(task) {
    setEditingId(task.id);
    setEditText(task.text);
  }

  function saveEdit(id) {
    const trimmed = editText.trim();
    if (!trimmed) return;
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t)));
    setEditingId(null);
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
      deleteTask={deleteTask}
      startEdit={startEdit}
      saveEdit={saveEdit}
      cancelEdit={cancelEdit}
    />
  );
}