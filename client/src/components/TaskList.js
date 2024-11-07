import React, { useState } from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, addTask, editTask, deleteTask, loading }) => {
  const [newTask, setNewTask] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      addTask(newTask);
      setNewTask('');
      setShowInput(false); // Hide input after adding a task
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTask(); // Corrected to call handleAddTask
    }
  };

  // If loading, show a loading message or spinner
  if (loading) {
    return (
      <div className="task-list">
        <h3>Daily Tasks</h3>
        <p>Loading tasks...</p> {/* You can replace this with a spinner */}
      </div>
    );
  }

  return (
    <div className="task-list">
      <h3>Daily Tasks</h3>

      {tasks.length === 0 ? (
        <p className="no-tasks">You're Done!</p>
      ) : (
        tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            index={index}
            editTask={editTask}
            deleteTask={() => deleteTask(task)}
          />
        ))
      )}

      {showInput && (
        <div className="add-task">
          <textarea
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter new task"
          />
          <button className="toggle-add-task" onClick={handleAddTask}>Add</button>
        </div>
      )}

      <button className="toggle-add-task" onClick={() => setShowInput(!showInput)}>
        {showInput ? 'Cancel' : 'Add'}
      </button>
    </div>
  );
};

export default TaskList;
