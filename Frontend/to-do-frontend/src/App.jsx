import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
const API_URL = "http://localhost:5000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
 
  useEffect(() => {
    axios.get(API_URL)
    .then(response => setTasks(response.data))
    .catch(error => console.error("Error fetching tasks", error));
  }, []);

  return (
    <>
      <div>
      <h1>Task List</h1>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => <li key={task._id}>{task.title} - {task.description || "No description"}</li>)
        ) : (
          <p>No tasks available.</p>
        )}
      </ul>
      </div>
    </>
  )
}

export default App;
