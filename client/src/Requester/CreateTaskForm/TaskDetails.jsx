import React from 'react';
import { Header, Form, Input } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

function TaskDetails(props) {

  // Event handler
  const handleChange = (e, data) => {
    props.onTaskDetailsChange(data);
  }

  return (
    <div>
      <Header inverted block color='grey'>Describe your task to Workers</Header>
      <Form className='form-container'>
        <Form.Group inline>
          <Form.Field>
            <label className='label'>Title</label>
            <Input 
              name='title'
              type='text'
              placeholder='Enter task title' 
              value={props.title}
              style={{width: "480px"}}
              onChange={handleChange}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <Form.Field>
            <label className='label'>Description</label>
            <Input 
              name='description'
              type='text'
              placeholder='Enter task description' 
              value={props.description}
              style={{width: "480px"}}
              onChange={handleChange}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <Form.Field>
            <label className='label'>Expiry</label>
            <SemanticDatepicker 
              datePickerOnly={true}
              name='expiry'
              onChange={handleChange}
            />
          </Form.Field>
        </Form.Group>
      </Form>
    </div>
  );
}

export default TaskDetails;
