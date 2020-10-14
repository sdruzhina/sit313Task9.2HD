import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from "../App";

function RequesterRoute({ component: Component, ...rest }) {
    // User auth context
    const { state: authState } = useContext(AuthContext);

    return (
        <Route {...rest} render={(props) => (
            authState.user && authState.user.isRequester 
            ? <Component {...props} />
            : <Redirect to='/login' />
        )} />
    );
}
export default RequesterRoute;
