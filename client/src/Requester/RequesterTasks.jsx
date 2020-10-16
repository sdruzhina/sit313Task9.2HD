import React, { useState } from 'react';
import TaskList from './TaskList'
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { Container, Header, Card, Button, Input, Select, Divider } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import './RequesterTasks.css';

function RequesterTasks() {
  // Filter state
  const [searchString, setSearchString] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState({ 
    dateFrom: null,
    dateTo: null
  });

  // Search event handler
  const handleSearch = (e, data) => {
    setSearchString(data.value);
  }

  // Search event handler
  const handleStatusFilter = (e, data) => {
    setStatusFilter(data.value);
  }
  
  // Date filter event handler
  const handleDateChange = (e, data) => {
    setDateFilter(prevState => ({
      ...prevState,
      [data.name]: data.value
    }));
  }

  // Status options
  const statusOptions = [
    { key: '', value: null, text: 'All' },
    { key: 'NEW', value: 'NEW', text: 'New' },
    { key: 'PROCESSING', value: 'PROCESSING', text: 'Processing' },
    { key: 'COMPLETED', value: 'COMPLETED', text: 'Completed' }
  ];


  return (
    <div>
      <Container>
        <Header as='h1'>
          My Tasks
        </Header>
        <div className='filters'>
          <Link to='/create'>
            <Button positive>+ New Task</Button>
          </Link>
          <Input 
            icon='search'
            placeholder='Search'
            value={searchString}
            name='searchString'
            onChange={handleSearch}
          />
          <Select 
            placeholder='Status' 
            name='statusFilter' 
            value={statusFilter}
            options={statusOptions} 
            onChange={handleStatusFilter}
          />
          <div>
            <div className='date-filter'>
              <label className='date-label' htmlFor='dateFrom'>Task Date from </label>
              <SemanticDatepicker 
                datePickerOnly={true}
                name='dateFrom'
                maxDate={dateFilter.dateTo}
                value={dateFilter.dateFrom}
                onChange={handleDateChange}
              />
              <label className='date-label' htmlFor='dateTo'>to</label>
              <SemanticDatepicker 
                datePickerOnly={true}
                name='dateTo'
                minDate={dateFilter.dateFrom}
                value={dateFilter.dateTo}
                onChange={handleDateChange}
              />
            </div>
          </div>
        </div>
        <Divider style={{margin: '0 0 20px 0'}} />
        <Card.Group>
          <TaskList 
            searchString={searchString}
            dateFilter={dateFilter} 
            statusFilter={statusFilter} 
          />
        </Card.Group>
      </Container>
    </div>
  );
}

export default RequesterTasks;
