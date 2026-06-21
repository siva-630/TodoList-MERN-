import { Check } from "lucide-react";
import TaskItem from "./TaskItem";

// The TaskList component is responsible for displaying all the tasks.
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
      {/* If there are tasks, we loop over them using `.map()` and render a TaskItem for each one */}
      {tasks.length > 0 && (
        <div className="flex flex-col gap-4">
          {tasks.map((task) => (
            <TaskItem
              key={task.id} // Every item in a list needs a unique 'key' in React
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

      {/* If the task list is completely empty, we show a nice empty state message */}
      {tasks.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-16 text-gray-400">
          <div className="size-14 rounded-full bg-blue-100 flex items-center justify-center">
            <Check size={24} strokeWidth={2} className="text-blue-700" />
          </div>
          <p className="text-sm font-medium">All clear! Add a task to get started.</p>
        </div>
      )}

      {/* If there are tasks, show a small summary at the very bottom */}
      {tasks.length > 0 && (
        <p className="text-center text-xs text-gray-400">
          {tasks.length - remaining} of {tasks.length} completed
        </p>
      )}
    </>
  );
};

export default TaskList;