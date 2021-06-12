import React from "react";

// router
import { Switch, Route } from "react-router-dom";

// components
// auth
import Login from "components/Auth/Login";
import ForgotPassword from "components/Auth/ForgotPassword";

import Dashboard from "components/Dashboard";

import Users from "components/Users";
import CreateUser from "components/Users/Pages/CreateUser";
import EditUser from "components/Users/Pages/EditUser";


import Emails from "components/Emails/Emails";
import CreateEmail from "components/Emails/Pages/CreateEmail";
import EditEmail from "components/Emails/Pages/EditEmail";

// page not found
import PageNotFound from "components/PageNotFound";

// protected routes
import ProtectedRoute from "./ProtectedRoute";

export default function AllRoutes(props) {
    return (
        <Switch>
            {/* <ProtectedRoute
                authLoading={props.authLoading}
                path="/"
                component={Dashboard}
                exact /> */}
            <Route path="/" component={Login} exact />

            {/* AUTH */}
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />

            {/* DASHBOARD */}
            <ProtectedRoute
                authLoading={props.authLoading}
                path="/dashboard"
                component={Dashboard}
            />

            {/* USERS */}
            <ProtectedRoute
                authLoading={props.authLoading}
                path="/settings/users/"
                component={Users}
                exact
            />
            <ProtectedRoute
                authLoading={props.authLoading}
                path="/settings/users/create"
                component={CreateUser}
                exact
            />
            <ProtectedRoute
                authLoading={props.authLoading}
                path="/settings/users/edit/:id"
                component={EditUser}
                exact
            />

            {/* EMAILS */}
            <ProtectedRoute
                authLoading={props.authLoading}
                path="/settings/emails/"
                component={Emails}
                exact
            />
            <ProtectedRoute
                authLoading={props.authLoading}
                path="/settings/emails/create"
                component={CreateEmail}
                exact
            />
            <ProtectedRoute
                authLoading={props.authLoading}
                path="/settings/emails/edit/:id"
                component={EditEmail}
                exact
            />

            <Route path="**" component={PageNotFound} />
        </Switch>
    );
}
