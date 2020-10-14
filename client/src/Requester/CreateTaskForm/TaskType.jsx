import React from 'react';
import { Form, Checkbox } from 'semantic-ui-react';

function TaskType(props) {

  const type = props.type;

  // Event handler
  const handleChange = (e, { value }) => {
    props.onTaskTypeChange({name: 'type', value: value});
  }

  return (
    <Form className='flex-form'>
      <Form.Field>
        Select task type:
      </Form.Field>
      <Form.Field>
        <Checkbox
          radio
          label='Choice Task'
          name='type'
          value='CHOICE'
          checked={type === 'CHOICE'}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <Checkbox
          radio
          label='Decision-Making Task'
          name='type'
          value='DECISION'
          checked={type === 'DECISION'}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <Checkbox
          radio
          label='Sentence-Level Task'
          name='type'
          value='SENTENCE'
          checked={type === 'SENTENCE'}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <Checkbox
          radio
          label='Image Processing Task'
          name='type'
          value='IMAGE'
          checked={type === 'IMAGE'}
          onChange={handleChange}
        />
      </Form.Field>
    </Form>
  );
}

export default TaskType;
