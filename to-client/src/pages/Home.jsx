import Navbar from "../components/Navbar"
import TaskForm from "../components/TaskForm"
import TaskList from "../components/TaskList"

const Home = ({tasks}) => {
  return (
      <>
          <Navbar/>
          <TaskForm />
          <TaskList   tasks={tasks}/>
          
      
      </>
  )
}

export default Home