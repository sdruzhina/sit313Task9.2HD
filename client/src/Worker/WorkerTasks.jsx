import React, { useState } from 'react';
import TaskList from './TaskList'
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import './WorkerTasks.css';
import { Container, Header, Card, Input, Divider } from 'semantic-ui-react'

function WorkerTasks() {

  // Today
  const today = new Date();

  // State
  const [searchString, setSearchString] = useState('');
  const [dateFilter, setDateFilter] = useState({ 
    dateFrom: today,
    dateTo: null
  });

  // Search event handler
  const handleSearch = (e, data) => {
    setSearchString(data.value);
  }
  
  // Date filter event handler
  const handleDateChange = (e, data) => {
    setDateFilter(prevState => ({
      ...prevState,
      [data.name]: data.value
    }));
  }


  return (
    <div>
      <Container>
        <Header as='h1'>
          Worker Tasks
        </Header>
        <div className='filters'>
          <Input 
            icon='search'
            placeholder='Search'
            value={searchString}
            name='searchString'
            onChange={handleSearch}
          />
          <div>
            <div className='date-filter'>
              <label className='date-label' htmlFor='dateFrom'>Expiry Date from </label>
              <SemanticDatepicker 
                datePickerOnly={true}
                name='dateFrom'
                minDate={today}
                maxDate={dateFilter.dateTo ? dateFilter.dateTo : null}
                value={dateFilter.dateFrom}
                onChange={handleDateChange}
              />
              <label className='date-label' htmlFor='dateTo'>to</label>
              <SemanticDatepicker 
                datePickerOnly={true}
                name='dateTo'
                minDate={dateFilter.dateFrom ? dateFilter.dateFrom : today}
                value={dateFilter.dateTo}
                onChange={handleDateChange}
              />
            </div>
          </div>
        </div>
        <Divider style={{margin: '10px 0 20px 0'}} />
        <Card.Group>
          <TaskList
            searchString={searchString}
            dateFilter={dateFilter} 
          />
        </Card.Group>
      </Container>
    </div>
  );
}

export default WorkerTasks;
