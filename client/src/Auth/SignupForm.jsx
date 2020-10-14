import React, { useState, useContext } from 'react';
import { Button, Form, Checkbox, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { AuthContext } from "../App";
import './SignupForm.css';

function SignupForm() {
  // Context for authentication state
  const { dispatch } = useContext(AuthContext);

  // Form data
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    isRequester: true,
    isWorker: false
  });
  
  // Event handler
  const handleChange = (e, data) => {
    const {name, value, checked} = data;
    setUserData((data) => {
      return {
        ...data,
        [name]: value ? value : checked
      };
    });
  }

  // Send user data to server
  const createUser = async (e) => {
    e.preventDefault();

    // Send credentials to backend
    fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then((response) => {
      if (response.token) {
        dispatch({
          type: 'LOGIN',
          payload: response
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='blue' textAlign='center'>
          Create iCrowdTask Account
        </Header>
        <Form size='large' onSubmit={createUser}>
          <Segment stacked>
          <Form.Input 
              fluid 
              placeholder='First name'
              type='text'
              name='firstName' 
              required
              onChange={handleChange} 
            />
            <Form.Input 
              fluid 
              placeholder='Last name'
              type='text'
              name='lastName' 
              required
              onChange={handleChange} 
            />
            <Form.Input 
              fluid 
              placeholder='Email address'
              type='email'
              name='email'
              required
              onChange={handleChange} 
            />
            <Form.Input
              fluid
              placeholder='Password'
              type='password'
              name='password'
              required
              onChange={handleChange} 
            />
            <Form.Input
              fluid
              placeholder='Password confirmation'
              type='password'
              name='passwordConfirm'
              required
              onChange={handleChange} 
            />
            <div className='form-flex'>
              <Form.Field>
                Sign up as: 
              </Form.Field>
              <Form.Field>
                <Checkbox
                  className='flex-item'
                  label='Requester'
                  name='isRequester'
                  checked={userData.isRequester}
                  onChange={handleChange} 
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  className='flex-item'
                  label='Worker'
                  name='isWorker'
                  checked={userData.isWorker}
                  onChange={handleChange}
                />
              </Form.Field>
            </div>
            <Button color='blue' fluid size='large'>
              Create Account
            </Button>
          </Segment>
        </Form>
        <Message>
          Have an account? <a href='/login'>Log in</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
}
export default SignupForm;