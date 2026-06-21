import { Trash2, Pencil, Check, X } from "lucide-react";

// TaskItem represents a single task in our list.
// It receives a single 'task' object, and several functions to interact with it.
const TaskItem = ({
  task,
  editingId,
  editText,
  setEditText,
  toggleTask,
  deleteTask,
  startEdit,
  saveEdit,
  cancelEdit,
}) => {
  // We check if THIS specific task is the one currently being edited
  const isEditing = editingId === task.id;

  return (
    <div
      // We conditionally add "opacity-60" if the task is completed to make it look faded
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-5 flex items-center gap-4 group transition-all duration-200 ${task.completed ? "opacity-60" : ""}`}
    >
      {/* Checkbox button to mark task as done or not done */}
      <button
        onClick={() => toggleTask(task.id)}
        className={`shrink-0 size-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          task.completed
            ? "bg-blue-700 border-blue-700" // Filled blue if completed
            : "bg-white border-gray-400 hover:border-blue-700" // Empty outline if not completed
        }`}
      >
        {task.completed && <Check size={13} strokeWidth={3} className="text-white" />}
      </button>

      {/* Main text area */}
      <div className="flex-1 min-w-0">
        {/* CONDITIONAL RENDERING: If we are editing, show an input box. Otherwise, show the text. */}
        {isEditing ? (
          <input
            autoFocus // Automatically select the input when edit mode starts
            className="w-full text-lg sm:text-xl font-medium text-gray-900 bg-transparent border-b-2 border-blue-700 outline-none pb-1"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveEdit(task.id);
              if (e.key === "Escape") cancelEdit();
            }}
          />
        ) : (
          <span
            className={`text-lg sm:text-xl font-medium leading-snug block truncate ${
              task.completed ? "line-through text-gray-400" : "text-gray-900"
            }`}
          >
            {task.text}
          </span>
        )}
      </div>

      {/* Action buttons on the right side */}
      <div className="flex items-center gap-2 shrink-0">
        {isEditing ? (
          // Save and Cancel buttons (only shown while editing)
          <>
            <button
              onClick={() => saveEdit(task.id)}
              className="size-8 flex items-center justify-center rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
            >
              <Check size={15} strokeWidth={2.5} />
            </button>
            <button
              onClick={cancelEdit}
              className="size-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <X size={15} strokeWidth={2.5} />
            </button>
          </>
        ) : (
          // Delete and Edit buttons (hidden by default, shown when hovering over the task)
          <>
            <button
              onClick={() => deleteTask(task.id)}
              className="size-8 flex items-center justify-center rounded-full text-red-600 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Delete task"
            >
              <Trash2 size={16} strokeWidth={2} />
            </button>
            <button
              onClick={() => startEdit(task)}
              className="size-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Edit task"
            >
              <Pencil size={15} strokeWidth={2} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
