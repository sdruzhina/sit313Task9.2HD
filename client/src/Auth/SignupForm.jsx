import React, { useState, useContext } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { AuthContext } from "../App";

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
  });

  // Errors
  const [error, setError] = useState(null);
  
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
    // Reset errors
    setError(null);

    // Send credentials to backend
    fetch('/auth/register', {
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
      else if (response.message) {
        setError(response.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const errorMessage = () => {
    return (error 
      ? <Message
        error
        content={error}
      /> 
      : null
    );
  }

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
            <Button color='blue' fluid size='large'>
              Create Account
            </Button>
          </Segment>
        </Form>
        {errorMessage()}
        <Message>
          Have an account? <a href='/login'>Log in</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
}
export default SignupForm;