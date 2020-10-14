import React, { useState } from 'react';
import { Header, Form, TextArea } from 'semantic-ui-react';

function TaskSetupSentence(props) {

  // Set up the question for the worker
  const [question, setQuestion] = useState(
    props.type === 'SENTENCE' ? props.setup : {question: ''}
  );

  // Event handler
  const handleChange = (e, data) => {
    setQuestion({question: data.value});
    props.onTaskDetailsChange({name: 'setup', value: question});
  }

  return (
    <div>
      <Header inverted block color='grey'>Task Setup - Sentence</Header>
      <Form className='form-container'>
      <Form.Field>
          This task will require the worker to provide a written answer to the question specified below.
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

export default TaskSetupSentence;
