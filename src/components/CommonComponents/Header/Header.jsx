import React from 'react'

// bootstrap
import { Container, Image } from 'react-bootstrap'

// header styles
import "./styles/header-styles.scss"

// icons : feather
import FeatherIcon from 'feather-icons-react';

// react router dom
import { Link } from 'react-router-dom';

import { globalLogout } from 'utlis/helpers/Common/CommonHelperFunctions'

export default function Header() {

    // handle logout
    const handleLogout = ev => {
        ev.preventDefault()

        if(window.confirm('Are you sure you want to logout?')) {
            globalLogout()
        }
    }
    return (
        <header className="border-bottom st-border-light bg-white">
            <Container fluid className="st-container">
                <div className="header d-flex">
                    {/* header search */}
                    {/* <div className="header-search">
                        <div className="st-form st-form-with-icon-left st-form-rounded">
                            <input type="text" className="form-control" placeholder="Search" />
                            <div className="icon">
                                <FeatherIcon
                                    icon="search"
                                    size="15"
                                    className="icon-main" />
                            </div>
                        </div>
                    </div> */}

                    {/* header menu */}
                    <div className="header-menu d-flex ms-auto">
                        {/* header menu item */}
                        <div className="hm_item me-2 me-md-3 notifications">
                            <Link
                                to="/"
                                className="st-round-btn st-btn-white d-flex align-items-center justify-content-center"
                                title="Notifications">
                                <FeatherIcon
                                    icon="bell"
                                    size="15"
                                    className="icon-main" />
                            </Link>

                            {/* header dropdown */}
                            <div className="header-dropdown">
                                <div className="hd_inner st-default-rounded-block">
                                    {/* top sec */}
                                    <div className="top-sec border-bottom st-border-light">
                                        <p className="st-fw-700 st-text-light text-center">You have <span className="st-text-primary">12</span> notifications</p>
                                    </div>

                                    <div className="all-links">
                                        {/* link item */}
                                        <Link to="/" className="link-item text-decoration-none d-flex">
                                            <div className="img rounded-circle d-flex align-items-center justify-content-center overflow-hidden">
                                                <Image
                                                    src="https://images.pexels.com/users/avatars/224453/andrea-piacquadio-138.jpeg?auto=compress&fit=crop&h=256&w=256"
                                                    fluid />
                                            </div>
                                            <div className="text media-body ps-3">
                                                <div className="name-time d-flex">
                                                    <p className="name st-fw-700 media-body pe-2">Admin</p>
                                                    <p className="time st-fs-14">5h ago</p>
                                                </div>
                                                <p className="message st-fs-14">
                                                    You have some pending task
                                                </p>
                                            </div>
                                        </Link>

                                        {/* link item */}
                                        <Link to="/" className="link-item text-decoration-none d-flex">
                                            <div className="img rounded-circle d-flex align-items-center justify-content-center overflow-hidden">
                                                <Image
                                                    src="https://images.pexels.com/users/avatars/224453/andrea-piacquadio-138.jpeg?auto=compress&fit=crop&h=256&w=256"
                                                    fluid />
                                            </div>
                                            <div className="text media-body ps-3">
                                                <div className="name-time d-flex">
                                                    <p className="name st-fw-700 media-body pe-2">Admin</p>
                                                    <p className="time st-fs-14">5h ago</p>
                                                </div>
                                                <p className="message st-fs-14">
                                                    You have some pending task
                                                </p>
                                            </div>
                                        </Link>

                                        {/* link item */}
                                        <Link to="/" className="link-item text-decoration-none d-flex">
                                            <div className="img rounded-circle d-flex align-items-center justify-content-center overflow-hidden">
                                                <Image
                                                    src="https://images.pexels.com/users/avatars/224453/andrea-piacquadio-138.jpeg?auto=compress&fit=crop&h=256&w=256"
                                                    fluid />
                                            </div>
                                            <div className="text media-body ps-3">
                                                <div className="name-time d-flex">
                                                    <p className="name st-fw-700 media-body pe-2">Admin</p>
                                                    <p className="time st-fs-14">5h ago</p>
                                                </div>
                                                <p className="message st-fs-14">
                                                    You have some pending task please test it as soon as possible.
                                                </p>
                                            </div>
                                        </Link>

                                        {/* link item */}
                                        <Link to="/" className="link-item text-decoration-none d-flex">
                                            <div className="img rounded-circle d-flex align-items-center justify-content-center overflow-hidden">
                                                <Image
                                                    src="https://images.pexels.com/users/avatars/224453/andrea-piacquadio-138.jpeg?auto=compress&fit=crop&h=256&w=256"
                                                    fluid />
                                            </div>
                                            <div className="text media-body ps-3">
                                                <div className="name-time d-flex">
                                                    <p className="name st-fw-700 media-body pe-2">Admin</p>
                                                    <p className="time st-fs-14">5h ago</p>
                                                </div>
                                                <p className="message st-fs-14">
                                                    You have some pending task
                                                </p>
                                            </div>
                                        </Link>

                                        {/* link item */}
                                        <Link to="/" className="link-item text-decoration-none d-flex">
                                            <div className="img rounded-circle d-flex align-items-center justify-content-center overflow-hidden">
                                                <Image
                                                    src="https://images.pexels.com/users/avatars/224453/andrea-piacquadio-138.jpeg?auto=compress&fit=crop&h=256&w=256"
                                                    fluid />
                                            </div>
                                            <div className="text media-body ps-3">
                                                <div className="name-time d-flex">
                                                    <p className="name st-fw-700 media-body pe-2">Admin</p>
                                                    <p className="time st-fs-14">5h ago</p>
                                                </div>
                                                <p className="message st-fs-14">
                                                    You have some pending task
                                                </p>
                                            </div>
                                        </Link>
                                    </div>

                                    {/* bottom sec */}
                                    <div className="bottom-sec border-top st-border-light text-center">
                                        <Link to="/" className="text-decoration-none st-fw-700 st-text-primary text-center">
                                            View all
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* header menu item */}
                        {/* <div className="hm_item me-2 me-md-3">
                            <Link
                                to="/"
                                className="st-round-btn st-btn-white d-flex align-items-center justify-content-center"
                                title="Messages">
                                <FeatherIcon
                                    icon="mail"
                                    size="15"
                                    className="icon-main" />
                            </Link>
                        </div> */}

                        {/* header menu item */}
                        <div className="hm_item user-profile">
                            <Link
                                to="/"
                                className="st-round-btn st-btn-white d-flex align-items-center justify-content-center"
                                title="Profile">
                                <Image
                                    src="https://images.pexels.com/users/avatars/224453/andrea-piacquadio-138.jpeg?auto=compress&fit=crop&h=256&w=256"
                                    fluid />
                            </Link>

                            {/* header dropdown */}
                            <div className="header-dropdown">
                                <div className="hd_inner st-default-rounded-block">
                                    {/* link item */}
                                    <Link to="/" className="link-item text-decoration-none d-flex align-items-center">
                                        <FeatherIcon
                                            icon="user"
                                            size="15"
                                            className="icon me-2" />
                                        <span>My Profile</span>
                                    </Link>

                                    {/* link item */}
                                    <Link to="/" className="link-item text-decoration-none d-flex align-items-center">
                                        <FeatherIcon
                                            icon="settings"
                                            size="15"
                                            className="icon me-2" />
                                        <span>Settings</span>
                                    </Link>

                                    {/* link item */}
                                    <Link to="/" className="link-item text-decoration-none d-flex align-items-center">
                                        <FeatherIcon
                                            icon="help-circle"
                                            size="15"
                                            className="icon me-2" />
                                        <span>Support</span>
                                    </Link>

                                    <div className="bottom-sec border-top st-border st-border-light">
                                        {/* link item */}
                                        <Link
                                            to="/"
                                            className="link-item text-decoration-none d-flex align-items-center"
                                            onClick={handleLogout}>
                                            <FeatherIcon
                                                icon="log-out"
                                                size="15"
                                                className="icon me-2" />
                                            <span>Logout</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </header>
    )
}
