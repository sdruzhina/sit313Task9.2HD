import React, { useState, useEffect, useContext } from 'react';
import TaskCard from './TaskCard'
import { AuthContext } from "../App";

function TaskList() {
  // User auth context
  const { state: authState } = useContext(AuthContext);

  // Task list state
  const [tasks, setTasks] = useState([]);

  // Load cards on mount
  useEffect(() => {
    fetch('http://localhost:8080/requester/tasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${authState.token}`
      }
    })
    .then(res => res.json())
    .then(res => setTasks(res))
    .catch((err) => console.log(err));
  }, [authState.token])

  return (
    tasks.map((task) => 
      <TaskCard 
        key = {task._id}
        title = {task.title}
        description = {task.description}
        type = {task.type}
        setup = {task.setup}
        reward = {task.reward}
        expiry = {task.expiry}
        numberWorkers = {task.numberWorkers}
        master = {task.master}
        createdAt = {task.createdAt}
      />
  ));
}

export default TaskList;
