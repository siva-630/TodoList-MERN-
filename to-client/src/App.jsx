import Home from "./pages/Home";

const App = () => {
  const tasks = [
    {
      id: 1,
      title:"learn react"
    },
    {
      id: 2,
      title:"learn java"
    }
  ]
  return (
    <>
    <Home tasks={tasks}/>
    </>
  );
};

export default App;