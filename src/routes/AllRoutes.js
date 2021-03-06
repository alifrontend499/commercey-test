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

import Categories from "components/Categories";
import CreateCategory from "components/Categories/Pages/CreateCategory";
import EditCategory from "components/Categories/Pages/EditCategory";

import Brands from "components/Brands";
import CreateBrand from "components/Brands/Pages/CreateBrand";
import EditBrand from "components/Brands/Pages/EditBrand";

import Products from "components/Products";
import CreateProduct from "components/Products/Pages/CreateProduct";
import EditProduct from "components/Products/Pages/EditProduct";

import Coupons from "components/Coupons";
import CreateCoupon from "components/Coupons/Pages/CreateCoupon";
import EditCoupon from "components/Coupons/Pages/EditCoupon";

// page not found
import PageNotFound from "components/PageNotFound";

// protected routes
import ProtectedRoute from "./ProtectedRoute";

// scroll to top
import ScrollToTop from './ScrollToTop'

export default function AllRoutes(props) {
    return (
        <React.Fragment>
            {/* SCROLL TO TOP WHEN ROUTE CHANGES */}
            <ScrollToTop />

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

                {/* CATALOG */}
                {/* categories */}
                <ProtectedRoute
                    authLoading={props.authLoading}
                    path="/catalog/categories/"
                    component={Categories}
                    exact
                />
                <ProtectedRoute
                    authLoading={props.authLoading}
                    path="/catalog/categories/create"
                    component={CreateCategory}
                    exact
                />
                <ProtectedRoute
                    authLoading={props.authLoading}
                    path="/catalog/categories/edit/:id"
                    component={EditCategory}
                    exact
                />

                {/* brands */}
                <ProtectedRoute
                    authLoading={props.authLoading}
                    path="/catalog/brands/"
                    component={Brands}
                    exact
                />
                <ProtectedRoute
                    authLoading={props.authLoading}
                    path="/catalog/brands/create"
                    component={CreateBrand}
                    exact
                />
                <ProtectedRoute
                    authLoading={props.authLoading}
                    path="/catalog/brands/edit/:id"
                    component={EditBrand}
                    exact
                />

                {/* products */}
                <ProtectedRoute
                    authLoading={props.authLoading}
                    path="/catalog/products/"
                    component={Products}
                    exact
                />
                <ProtectedRoute
                    authLoading={props.authLoading}
                    path="/catalog/products/create"
                    component={CreateProduct}
                    exact
                />
                <ProtectedRoute
                    authLoading={props.authLoading}
                    path="/catalog/products/edit/:id"
                    component={EditProduct}
                    exact
                />

                {/* coupons */}
                <ProtectedRoute
                    authLoading={props.authLoading}
                    path="/catalog/coupons/"
                    component={Coupons}
                    exact
                />
                <ProtectedRoute
                    authLoading={props.authLoading}
                    path="/catalog/coupons/create"
                    component={CreateCoupon}
                    exact
                />
                <ProtectedRoute
                    authLoading={props.authLoading}
                    path="/catalog/coupons/edit/:id"
                    component={EditCoupon}
                    exact
                />

                <Route path="**" component={PageNotFound} />
            </Switch>
        </React.Fragment>
    );
}
