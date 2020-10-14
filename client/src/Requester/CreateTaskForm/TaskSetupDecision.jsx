import React, { useState } from 'react';
import { Header, Form, TextArea } from 'semantic-ui-react';

function TaskSetupDecision(props) {

  // Set up the question for the worker
  const [question, setQuestion] = useState(
    props.type === 'DECISION' ? props.setup : {question: ''}
  );

  // Event handler
  const handleChange = (e, data) => {
    setQuestion({question: data.value});
    props.onTaskDetailsChange({name: 'setup', value: question});
  }

  return (
    <div>
      <Header inverted block color='grey'>Task Setup - Decision</Header>
      <Form className='form-container'>
      <Form.Field>
          This task will require the worker to provide a True / False answer to the question specified below.
        </Form.Field>
        <Form.Group inline>
          <Form.Field>
            <label className='label'>Question</label>
            <TextArea 
              name='question'
              placeholder='Enter the question' 
              value={question.question}
              style={{width: "480px"}}
              onChange={handleChange}
            />
          </Form.Field>
        </Form.Group>
      </Form>
      
    </div>
  );
}

export default TaskSetupDecision;
