import React, { useState, useEffect } from 'react';

const TaskItem = ({ task, index, editTask, deleteTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTask, setUpdatedTask] = useState(task);

    const handleEdit = () => {
        setIsEditing(true);
        setUpdatedTask(task); // Reset updatedTask when editing a task
    };

    const handleSave = () => {
        editTask(index, updatedTask);
        setIsEditing(false);
    };

    useEffect(() => {
        if (updatedTask !== task) {
            setUpdatedTask(task); // Reset the task if the task prop changes
            setIsEditing(false);   // Stop editing if the task is deleted or changed
        }
    }, [task, updatedTask]); // Track changes in task or updatedTask

    return (
        <div className="task-item">
            {isEditing ? (
                <textarea
                    type="text"
                    value={updatedTask}
                    onChange={(e) => setUpdatedTask(e.target.value)}
                />
            ) : (
                <p>{task}</p>
            )}
            <div className="task-actions">
                {isEditing ? (
                    <button onClick={handleSave}>💾</button>
                ) : (
                    <button onClick={handleEdit}>✏️</button>
                )}
                <button onClick={() => deleteTask(index)}>🗑️</button>
            </div>
        </div>
    );
};

export default TaskItem;
