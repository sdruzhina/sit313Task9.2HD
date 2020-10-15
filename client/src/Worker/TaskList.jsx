import React, { useState, useEffect, useContext } from 'react';
import TaskCard from './TaskCard'
import { AuthContext } from "../App";

function TaskList(props) {
  // User auth context
  const { state: authState } = useContext(AuthContext);

  // List of available tasks
  const [tasks, setTasks] = useState([]);

  // Filtered task list
  const filteredTasks = tasks.filter(function(task) {
    // Get task expiry date as a Date object
    const expiryDate = new Date(task.expiry);

    // Filter array by date only if both FROM and TO dates are set
    if (props.dateFilter.dateFrom && props.dateFilter.dateTo) {
      return task.title.toLowerCase().includes(props.searchString.toLowerCase())
        && expiryDate >= props.dateFilter.dateFrom
        && expiryDate <= props.dateFilter.dateTo;
      }
      // Otherwise only filter by search string
      else {
        return task.title.toLowerCase().includes(props.searchString.toLowerCase());
      }
  });

  // Load cards on mount
  useEffect(() => {
    fetch('/worker/tasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${authState.token}`
      }
    })
    .then(res => res.json())
    .then(res => setTasks(res))
    .catch((err) => console.log(err));
  }, [authState.token]);

  // Delete task for this worker
  const onDelete = (taskId) => {
    // Remove the task from the array
    setTasks(tasks.filter(task => task._id !== taskId));

    // Send the request to the API
    const userId = authState.user._id;
    fetch(`/worker/${userId}/workertasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${authState.token}`
      }
    })
    .catch((err) => console.log(err));
  }


  return (
    filteredTasks.map((task) => 
      <TaskCard 
        key = {task._id}
        id = {task._id}
        title = {task.title}
        description = {task.description}
        type = {task.type}
        setup = {task.setup}
        reward = {task.reward}
        expiry = {task.expiry}
        numberWorkers = {task.numberWorkers}
        master = {task.master}
        createdAt = {task.createdAt}
        onDelete = {onDelete}
      />
  ));
}

export default TaskList;
