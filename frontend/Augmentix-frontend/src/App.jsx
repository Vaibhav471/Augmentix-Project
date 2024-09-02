import { useEffect, useState } from 'react';
import Task from './Task';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:4000/tasks');
        if (response.ok) {
          const data = await response.json();
          setTasks(data); // Assuming data is an array of { id, task } objects
        } else {
          console.error('Failed to fetch tasks:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [tasks]);

  const handleInputChange = (value) => {
    setTask(value);
  };

  const addTask = async () => {
    if (task.trim() === '') {
      alert('Task cannot be empty');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: task }),
      });

      if (response.ok) {
        const newTask = await response.json(); // Assuming the API returns the created task with an id
        console.log('Task saved successfully:', newTask);

        setTasks((prevTasks) => [...prevTasks, newTask]);
        setTask(''); // Clear the input field
      } else {
        console.error('Failed to save task:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      console.log("This is ID->",id);
      const response = await fetch(`http://localhost:4000/tasks/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Task deleted successfully');
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      } else {
        console.error('Failed to delete task:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className='h-screen w-full bg-zinc-800'>
      <h1 className='text-9xl text-red-800 ml-12'>ToDo List</h1>
      <div className='mt-40 ml-40'>
        <input
          type="text"
          id='inpTask'
          className='w-72 h-12 rounded-lg'
          value={task}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Enter a new task"
        />
        <button
          className='text-white bg-red-800 ml-3 w-24 rounded-lg text-xl h-12'
          onClick={addTask}
        >
          Add Task
        </button>
        <div className='text-white border-4 border-red-800 w-96 p-4 rounded-lg mt-6'>
          {tasks.map((item) => (
            <Task key={item.id} task={item} onDelete={deleteTask} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
