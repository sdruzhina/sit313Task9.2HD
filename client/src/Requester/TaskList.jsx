import React, { useState, useEffect, useContext } from 'react';
import TaskCard from './TaskCard'
import { AuthContext } from "../App";

function TaskList(props) {
  // User auth context
  const { state: authState } = useContext(AuthContext);

  // Task list state
  const [tasks, setTasks] = useState([]);

  // Filtered task list
  const filteredTasks = tasks.filter(function(task) {
    // Get task createdAt date as a Date object
    const taskDate = new Date(task.createdAt);

    // Filter array by date only if both FROM and TO dates are set
    if (props.dateFilter.dateFrom && props.dateFilter.dateTo) {
      return task.title.toLowerCase().includes(props.searchString.toLowerCase())
        && taskDate >= props.dateFilter.dateFrom
        && taskDate <= props.dateFilter.dateTo
        && (props.statusFilter === null || task.status === props.statusFilter);
    }
    // Otherwise only filter by search string
    else {
      return task.title.toLowerCase().includes(props.searchString.toLowerCase())
        && (props.statusFilter === null || task.status === props.statusFilter);
    }
  });

  // Load cards on mount
  useEffect(() => {
    fetch('/requester/tasks', {
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
    filteredTasks.map((task) => 
      <TaskCard 
        key = {task._id}
        title = {task.title}
        description = {task.description}
        setup = {task.setup}
        status = {task.status}
        response = {task.response}
        createdAt = {task.createdAt}
      />
  ));
}

export default TaskList;
