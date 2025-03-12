import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'
import { response } from 'express'

function App() {
  const [count, setCount] = useState(0)
  const [tasks, setTasks] = useState([]);
  // const axios = require('axios/dist/node/axios.cjs'); // node
  const API_URL = "http://localhost5000/tasks";

  useEffect(() => {
    axios.get(API_URL)
    .then(response => setTasks(response.data))
    .catch(error => console.error("Error fetching tasks", error));
  }, []);

  return (
    <div>
      <h1>
        Task List: 
      </h1>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>


    </div>
  )
}


//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

export default App;
