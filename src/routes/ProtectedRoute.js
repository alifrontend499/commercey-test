import React from 'react';
// react router dom
import { Route, Redirect } from 'react-router-dom';

// redux
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, isUserAuthenticated, authLoading, ...rest }) => {
    return (
        // show the component only when the user is logged in
        // otherwise, redirect the user to /auth page
        <Route {...rest} render={routeProps => (
            !authLoading ? (
                isUserAuthenticated ? <Component {...routeProps} /> : <Redirect to="/login" />
            ) : (
                <div className="d-flex justify-content-center align-items-center position-fixed h-100 w-100" style={{ top: 0, left: 0, zIndex: 9999, backgroundColor: '#fff' }}>
                    <div className="spinner-grow align-self-center" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            )
        )} />
    );
};

const getDataFromStore = state => {
    return {
        isUserAuthenticated: state.auth.isUserAuthenticated
    };
}

export default connect(getDataFromStore, null)(PrivateRoute)