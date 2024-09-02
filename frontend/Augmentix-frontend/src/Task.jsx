import React from 'react';

function Task({ task, onDelete }) {
  return (
    <div className='flex justify-between items-center mt-6'>
      <h1>{task.task}</h1>
      <button 
        className='bg-red-800 w-12 h-12 rounded-lg text-white' 
        onClick={() => onDelete(task._id)}
      >
        X
      </button>
    </div>
  );
}

export default Task;
