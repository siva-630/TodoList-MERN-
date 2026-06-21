import { Plus } from "lucide-react";

// This component shows the input box where a user types a new task.
// It receives three "props": the current input text, the function to update it, and the function to add a task.
const TaskForm = ({ input, setInput, addTask }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col gap-4">
      <span className="text-xs font-semibold tracking-wider text-blue-700 uppercase">
        Create New Task
      </span>
      <div className="flex gap-3 items-center">
        {/* 
          This is a "controlled input". Its value is controlled by React state (the `input` prop). 
          Whenever the user types, `onChange` runs and updates the state.
        */}
        <input
          className="flex-1 text-base text-gray-900 placeholder:text-gray-400 bg-gray-100 rounded-xl px-4 py-3 outline-none border border-transparent focus:border-blue-700 transition-colors"
          placeholder="What needs to be done?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()} // If they press Enter, add the task
        />
        {/* The add button triggers the `addTask` function when clicked */}
        <button
          onClick={addTask}
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 active:scale-95 text-white text-sm font-medium px-5 py-3 rounded-xl shadow transition-all duration-150 shrink-0"
        >
          <Plus size={15} strokeWidth={2.5} />
          ADD
        </button>
      </div>
    </div>
  );
};

export default TaskForm;