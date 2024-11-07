import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import axios from "axios";

const CharacterCard = ({ id, name, image }) => {
  const [xp, setXp] = useState();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  // Fetch character data from the backend
  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        const response = await axios.get(
          `https://katyaxpfarm.onrender.com/api/characters/${id}`
        );
        const character = response.data;
        setXp(character.xp); // Set XP from the database
        setTasks(character.tasks.map((task) => task.name)); // Set tasks from the database
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        // console.error("Error fetching character data:", error);
        setLoading(false); // Even if there's an error, stop loading
      }
    };

    fetchCharacterData();
  }, [id]); // Run once when the component mounts (id as dependency)

  const updateCharacter = async (updatedXp, updatedTasks) => {
    // Convert tasks array of strings to objects with { name: "task_name" }
    const tasksWithName = updatedTasks.map((task) =>
      typeof task === "string" ? { name: task } : task
    );

    try {
      const response = await axios.put(
        `https://katyaxpfarm.onrender.com/api/characters/${id}`,
        {
          xp: updatedXp,
          tasks: tasksWithName,
        }
      );
    //   console.log("Character updated:", response.data);
    } catch (error) {
    //   console.error("Error updating character", error);
    //   console.log(`ID: ${id}`);
    }
  };

  const gainXp = () => {
    const newXp = xp + 10 >= 10000 ? 10000 : xp + 10;
    setXp(newXp);
    updateCharacter(newXp, tasks); // Call updateCharacter with new XP
  };

  const loseXp = () => {
    const newXp = xp - 10;
    setXp(newXp);
    updateCharacter(newXp, tasks); // Call updateCharacter with new XP
  };

  const resetXp = () => {
    setXp(0);
    updateCharacter(0, tasks); // Call updateCharacter with XP reset to 0
  };

  const addTask = (task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    updateCharacter(xp, newTasks); // Update with new tasks
  };

  const editTask = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
    updateCharacter(xp, updatedTasks); // Update with edited tasks
  };

  const deleteTask = (taskToDelete) => {
    setTasks(tasks.filter((task) => task !== taskToDelete));
    updateCharacter(
      xp,
      tasks.filter((task) => task !== taskToDelete)
    );
  };

  return (
    <div className="character-card">
      <img src={image} alt={name} className="character-image" />
      <h2>{name}</h2>
      <div className="xp-section">
        <p>{loading ? 'XP: ---' : `XP: ${xp}`}</p>
        <button onClick={gainXp}>Gain 10 XP</button>
        <button onClick={loseXp}>Lose 10 XP</button>
        <button onClick={resetXp}>Reset XP</button>
      </div>
      <TaskList
        tasks={tasks}
        addTask={addTask}
        editTask={editTask}
        deleteTask={deleteTask}
        loading={loading}
      />
    </div>
  );
};

export default CharacterCard;
