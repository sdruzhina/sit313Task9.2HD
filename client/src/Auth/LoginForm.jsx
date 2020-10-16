import React, { useState, useContext } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { AuthContext } from "../App";

function LoginForm() {
  // Context for authentication state
  const { dispatch } = useContext(AuthContext);

  // Form data state
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: ''
  });

  // Errors
  const [error, setError] = useState(null);
  
  // Event handler
  const handleChange = (e, data) => {
    const {name, value} = data;
    setUserCredentials((data) => {
      return {
        ...data,
        [name]: value
      };
    });
  }
  
  // Send login data to server
  const loginUser = async (e) => {
    e.preventDefault();

    // Send credentials to backend
    fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userCredentials)
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
      setError(true)
    });
  };

  return (
    <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='blue' textAlign='center'>
          iCrowdTask Login
        </Header>
        <Form size='large' onSubmit={loginUser}>
          <Segment stacked>
          <Form.Input 
              fluid 
              icon='user' 
              iconPosition='left' 
              placeholder='Email address'
              type='email'
              name='email'
              required
              onChange={handleChange} 
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              name='password'
              required
              onChange={handleChange}
            />
            <Button color='blue' fluid size='large' type='submit'>
              Login
            </Button>
          </Segment>
        </Form>
        {error 
        ? <Message
          error
          content='Invalid email or password.'
        /> 
        : null}
        <Message>
          Don't have an account? <a href='/signup'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default LoginForm;