import { Plus } from "lucide-react";

const TaskForm = ({ input, setInput, addTask }) => {
  return (
    <div className="bg-white rounded-[16px] shadow-[0px_1px_3px_rgba(0,0,0,0.07)] border border-[rgba(195,198,215,0.3)] p-6 flex flex-col gap-4">
      <span className="text-[11px] font-semibold tracking-[1.2px] text-[#004ac6] uppercase">
        Create New Task
      </span>
      <div className="flex gap-3 items-center">
        <input
          className="flex-1 text-[16px] text-[#131b2e] placeholder:text-[rgba(67,70,85,0.4)] bg-[#f5f5fa] rounded-[10px] px-4 py-3 outline-none border border-transparent focus:border-[#004ac6] transition-colors"
          placeholder="What needs to be done?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button
          onClick={addTask}
          className="flex items-center gap-2 bg-[#004ac6] hover:bg-[#003ba0] active:scale-95 text-white text-[14px] font-medium px-5 py-3 rounded-[12px] shadow-[0px_6px_14px_-3px_rgba(0,74,198,0.3)] transition-all duration-150 shrink-0"
        >
          <Plus size={15} strokeWidth={2.5} />
          ADD
        </button>
      </div>
    </div>
  );
};

export default TaskForm;