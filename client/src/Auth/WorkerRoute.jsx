import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from "../App";

function WorkerRoute({ component: Component, ...rest }) {
    // User auth context
    const { state: authState } = useContext(AuthContext);

    return (
        <Route {...rest} render={(props) => (
            authState.user && authState.user.isWorker 
            ? <Component {...props} />
            : <Redirect to='/login' />
        )} />
    );
}
export default WorkerRoute;
