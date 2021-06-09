import React from 'react'

// bootstrap
import {
    Container,
} from 'react-bootstrap';

// breadcrumbs styles
import './styles/breadcrumbs-styles.scss'

// icons : feather
import FeatherIcon from 'feather-icons-react';

// react router dom
import { Link } from 'react-router-dom';

export default function BreadCrumbs(props) {
    return (
        <div id="st-breadcrumbs1" className="">
            <Container>
                <div className="st-breadcrumbs1 d-flex flex-wrap">
                    <div className="item position-relative">
                        <Link to="/dashboard" className="st-breadcrumbs-link text-decoration-none st-text-dark d-flex">
                            <FeatherIcon
                                icon="home"
                                size="12"
                                className="icon me-2 mt-1" />
                            <span>Home</span>
                        </Link>
                    </div>

                    {
                        /* CURRENT ROUTE */
                        (props.currentRouteSingle && Object.keys(props.currentRouteSingle).length > 0) && (
                            <div className="item position-relative">
                                <Link to={props.currentRouteSingle.routeUrl && props.currentRouteSingle.routeUrl}
                                    className="st-breadcrumbs-link text-decoration-none st-text-dark d-flex">
                                    <span>{props.currentRouteSingle.routeName}</span>
                                </Link>
                            </div>
                        )
                    }

                    {
                        /* ALL ROUTE ARRAY */
                        props.currentRouteArray && props.currentRouteArray.map((item, key) => (
                            <div key={key} className="item position-relative">
                                <Link to={item.routeUrl && item.routeUrl}
                                    className="st-breadcrumbs-link text-decoration-none st-text-dark d-flex">
                                    <span>{item.routeName && item.routeName}</span>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}
