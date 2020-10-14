import React from 'react';
import { Header, Form, Input, Checkbox } from 'semantic-ui-react';

function WorkerRequirements(props) {

  // Event handler
  const handleChange = (e, data) => {
    props.onTaskDetailsChange(data);
  }

  return (
    <div>
      <Header inverted block color='grey'>Worker Requirements</Header>
      <Form className='form-container'>
      <div className='flex-form'>
        <Form.Field>
          Require master workers
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label='Yes'
            name='master'
            value={true}
            checked={props.master === true}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label='No'
            name='master'
            value={false}
            checked={props.master === false}
            onChange={handleChange}
          />
        </Form.Field>
      </div>
        <Form.Group inline>
          <Form.Field>
            <label className='label'>Reward per response</label>
            <Input 
              name='reward'
              type='number'
              min={0}
              value={props.reward}
              onChange={handleChange}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <Form.Field>
            <label className='label'>Number of workers</label>
            <Input 
              name='numberWorkers'
              type='number'
              min={1} 
              value={props.numberWorkers}
              onChange={handleChange}
            />
          </Form.Field>
        </Form.Group>
      </Form>
    </div>
  );
}

export default WorkerRequirements;
