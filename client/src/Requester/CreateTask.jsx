import React, { useState, useContext }  from 'react';
import { useHistory } from "react-router-dom";
import './CreateTask.css';
import { Container, Segment, Header, Button, Modal } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { AuthContext } from "../App";
import TaskDetails from './CreateTaskForm/TaskDetails';
import TaskSetupImage from './CreateTaskForm/TaskSetupImage';

function CreateTask() {
  // User auth context
  const { state: authState } = useContext(AuthContext);

  // Router history
  const history = useHistory();

  // Form data
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    setup: null,
  });

  // Confirmation modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [success, setSuccess] = useState(true);

  // Open confirmation modal
  const openModal = (res) => {
    setSuccess(res.errors ? false : true);
    setModalMessage(res.message);
    setModalOpen(true);
  }

  // Close confirmation modal
  const closeModal = () => {
    setModalOpen(false);
    if (success) {
      history.push('/');
    }
  }

  // Event handler
  const handleChange = (e) => {
    const {name, value} = e;
    setTaskData((data) => {
      if (name !== 'type') {
        return {
          ...data,
          [name]: value
        };
      }
      else {
        return {
          ...data,
          [name]: value,
          setup: null
        };
      }
    });
  }

  // Save the task to DB
  function saveTask() {
    fetch('/requester/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${authState.token}`
      },
      body: JSON.stringify(taskData)
    })
    .then(res => res.json())
    .then((res) => openModal(res))
    .catch((err) => console.log(err));
  }


  return (
    <div>
      <Container>
        <Header as='h1'>
          New Task
        </Header>
        <Segment>
          <TaskDetails 
            title={taskData.title} 
            description={taskData.description} 
            onTaskDetailsChange={handleChange} 
          />
          <TaskSetupImage
            setup={taskData.setup} 
            onTaskDetailsChange={handleChange}  
          />
          <div className='action-buttons'>
            <Link to='/'>
              <Button>Cancel</Button>
            </Link>
            <Button positive onClick={saveTask}>Save</Button>
          </div>
        </Segment>
      </Container>

      <Modal
        size='mini'
        open={modalOpen}
        onClose={closeModal}
      >
        <Modal.Header>{success ? 'Success' : 'Error'}</Modal.Header>
        <Modal.Content>
          <p>{modalMessage}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button positive onClick={closeModal}>
            OK
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default CreateTask;
