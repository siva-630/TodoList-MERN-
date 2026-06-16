import { Check } from "lucide-react";
import TaskItem from "./TaskItem";

const TaskList = ({
  tasks,
  remaining,
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
    <>
      {tasks.length > 0 && (
        <div className="flex flex-col gap-4">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              editingId={editingId}
              editText={editText}
              setEditText={setEditText}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
              startEdit={startEdit}
              saveEdit={saveEdit}
              cancelEdit={cancelEdit}
            />
          ))}
        </div>
      )}

      {tasks.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-16 text-[#9295a8]">
          <div className="size-14 rounded-full bg-[#eaedff] flex items-center justify-center">
            <Check size={24} strokeWidth={2} className="text-[#004ac6]" />
          </div>
          <p className="text-[15px] font-medium">All clear! Add a task to get started.</p>
        </div>
      )}

      {tasks.length > 0 && (
        <p className="text-center text-[13px] text-[#9295a8]">
          {tasks.length - remaining} of {tasks.length} completed
        </p>
      )}
    </>
  );
};

export default TaskList;