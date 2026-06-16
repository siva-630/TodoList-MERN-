import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Home = ({
  greeting,
  tasks,
  remaining,
  progress,
  input,
  setInput,
  addTask,
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
      className="min-h-screen w-full flex flex-col isolate items-center"
      style={{
        background: "linear-gradient(135deg, #faf8ff 0%, #f4f0ff 100%)",
        fontFamily: "'Geist', sans-serif",
      }}
    >
      <Navbar />

      <div className="w-full max-w-[720px] px-4 sm:px-6 pt-10 pb-20 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-[32px] font-semibold tracking-[-0.64px] text-[#131b2e] leading-tight">
            {greeting}
          </h1>
          <p className="text-[16px] text-[#434655]">
            {remaining === 0
              ? tasks.length === 0
                ? "No tasks yet. Add one below."
                : "All tasks complete. Great work!"
              : `You have ${remaining} task${remaining !== 1 ? "s" : ""} remaining for today.`}
          </p>
        </div>

        <div className="w-full h-[6px] bg-[#eaedff] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#004ac6] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <TaskForm input={input} setInput={setInput} addTask={addTask} />

        <TaskList
          tasks={tasks}
          remaining={remaining}
          editingId={editingId}
          editText={editText}
          setEditText={setEditText}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          startEdit={startEdit}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
        />
      </div>
    </div>
  );
};

export default Home;