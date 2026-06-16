import { Trash2, Pencil, Check, X } from "lucide-react";

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
  return (
    <div
      className={`bg-white rounded-2xl shadow-[0px_2px_8px_rgba(15,23,42,0.06)] border border-[rgba(195,198,215,0.2)] px-6 py-5 flex items-center gap-4 group transition-all duration-200 ${task.completed ? "opacity-60" : ""}`}
    >
      <button
        onClick={() => toggleTask(task.id)}
        className={`shrink-0 size-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          task.completed
            ? "bg-[#004ac6] border-[#004ac6]"
            : "bg-white border-[#737686] hover:border-[#004ac6]"
        }`}
      >
        {task.completed && <Check size={13} strokeWidth={3} className="text-white" />}
      </button>

      <div className="flex-1 min-w-0">
        {editingId === task.id ? (
          <input
            autoFocus
            className="w-full text-[18px] sm:text-[20px] font-medium text-[#131b2e] bg-transparent border-b-2 border-[#004ac6] outline-none pb-1"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveEdit(task.id);
              if (e.key === "Escape") cancelEdit();
            }}
          />
        ) : (
          <span
            className={`text-[18px] sm:text-[20px] font-medium leading-snug block truncate ${
              task.completed ? "line-through text-[#9295a8]" : "text-[#131b2e]"
            }`}
          >
            {task.text}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {editingId === task.id ? (
          <>
            <button
              onClick={() => saveEdit(task.id)}
              className="size-8.5 flex items-center justify-center rounded-full bg-[#004ac6] text-white hover:bg-[#003ba0] transition-colors"
            >
              <Check size={15} strokeWidth={2.5} />
            </button>
            <button
              onClick={cancelEdit}
              className="size-8.5 flex items-center justify-center rounded-full bg-[#f0f0f5] text-[#434655] hover:bg-[#e4e4ee] transition-colors"
            >
              <X size={15} strokeWidth={2.5} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => deleteTask(task.id)}
              className="size-8.5 flex items-center justify-center rounded-full text-[#BA1A1A] hover:bg-[#fff0f0] transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Delete task"
            >
              <Trash2 size={16} strokeWidth={2} />
            </button>
            <button
              onClick={() => startEdit(task)}
              className="size-8.5 flex items-center justify-center rounded-full text-[#434655] hover:bg-[#f0f0f5] transition-colors opacity-0 group-hover:opacity-100"
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
