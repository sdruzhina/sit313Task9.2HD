import React, { useEffect, useContext } from 'react';
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";

function Logout() {
  // Context for authentication state
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    dispatch({
      type: 'LOGOUT'
    });
  }, []);

  return <Redirect to='/login' />;
}

export default Logout;