import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

// The Home component acts as the main layout of our app.
// It receives all the "props" (data and functions) from App.jsx and passes them down.
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
    // The main container with a full screen height and a subtle background gradient
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-50 font-sans">
      {/* Top navigation bar */}
      <Navbar />

      <div className="w-full max-w-2xl px-4 sm:px-6 pt-10 pb-20 flex flex-col gap-8">
        
        {/* Header section with the greeting and remaining tasks count */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 leading-tight">
            {greeting}
          </h1>
          <p className="text-base text-gray-600">
            {remaining === 0
              ? tasks.length === 0
                ? "No tasks yet. Add one below."
                : "All tasks complete. Great work!"
              : `You have ${remaining} task${remaining !== 1 ? "s" : ""} remaining for today.`}
          </p>
        </div>

        {/* The visual progress bar that fills up as tasks are completed */}
        <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-700 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* The form where users type a new task */}
        <TaskForm input={input} setInput={setInput} addTask={addTask} />

        {/* The list that loops through all tasks and displays them */}
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