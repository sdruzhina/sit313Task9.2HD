import React, { useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import PageHeader from './PageHeader';
import RequesterTasks from './Requester/RequesterTasks';
import CreateTask from './Requester/CreateTask';
import SignupForm from './Auth/SignupForm';
import LoginForm from './Auth/LoginForm';
import Logout from './Auth/Logout';
import RequesterRoute from './Auth/RequesterRoute';
import './App.css';

// Create context to share authentication data between components
export const AuthContext = React.createContext();

const initialState = {
  user: null,
  token: null
};

// Check if JWT has expired
function jwtValid() {
  const token = localStorage.getItem('id_token');
  const decodedToken = jwt.decode(token, {complete: true});
  return decodedToken.exp < new Date();
}

// Reducer actions for login and logout
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('JWT', JSON.stringify(action.payload.token));
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token
      };
    case 'AUTHENTICATE':
      if (jwtValid()) {
        return {
          ...state,
          user: action.payload.user,
          token: action.payload.token
        };
      }
      else {
        localStorage.clear();
        return {
          ...state,
          user: null
        };
      }
    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};

function App() {
  // Reducer for maintaining login/logout data and actions
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load auth state on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('JWT'));
    if (user !== null && token !== null) {
        dispatch({
          type: 'AUTHENTICATE',
          payload: { user, token }
        });
      }
  }, []);


  return (
    <AuthContext.Provider
      value={{ state, dispatch }}
    >
      <div className='App'>
        <Router>
        <PageHeader />
          <Route exact path='/'>
            {state.user ? <Redirect to='/requester' /> : <Redirect to='/login' />}
          </Route>
          <RequesterRoute path='/requester' component={RequesterTasks} />
          <RequesterRoute path='/create' component={CreateTask} />
          <Route path='/signup'>{state.user ? <Redirect to='/requester' /> : <SignupForm/>}</Route>
          <Route path='/login'>{state.user ? <Redirect to='/requester' /> : <LoginForm/>}</Route>
          <Route path='/logout' component={Logout} />
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
