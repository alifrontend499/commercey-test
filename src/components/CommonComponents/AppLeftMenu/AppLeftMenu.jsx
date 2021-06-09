import React, { useState } from 'react'

// bootstrap
import { Image } from 'react-bootstrap'

// app left menu styles
import './styles/app-left-menu-styles.scss'

// icons : feather
import FeatherIcon from 'feather-icons-react';

// logo
import appLogo from 'assets/images/logo.png'

// react router
import { Link, NavLink } from 'react-router-dom';

export default function AppLeftMenu() {
    const [openedDropdowns, setOpenedDropdowns] = useState([])
    const [menuExpanded, setMenuExpanded] = useState(false)

    // toggle submenu in the left menu
    const handleSubMenuVisibility = (ev, dataId) => {
        ev.preventDefault()

        const dataIdExists = openedDropdowns.find(item => item === dataId)
        if (dataIdExists) {
            const filteredDropdowns = openedDropdowns.filter(item => item !== dataId)

            // updating the opened dropdown list
            setOpenedDropdowns([...filteredDropdowns])

            setTimeout(() => {
            }, 1500);
        } else {
            // updating the opened dropdown list
            setOpenedDropdowns([...openedDropdowns, dataId])

            setTimeout(() => {
            }, 1500);
        }
    }

    // toggle menu expand or normal
    const handleMenuExpantion = () => {
        setMenuExpanded(!menuExpanded)

        // closing all the opened dropdowns
        // setOpenedDropdowns([])
    }


    const handleMenuButtonMouseEnter = ev => {
        if (!menuExpanded) {
            ev.stopPropagation()
        }
    }

    const handleSimpleLinkClick = () => {
        // updating the opened dropdown list
        setOpenedDropdowns([])
    }

    return (
        <div className={`app-left-menu ${menuExpanded ? "shrunk" : "expanded"}`}>
            <div className="inner bg-white h-100">
                {/* logo */}
                <div className="st-logo d-flex align-items-center border-bottom st-border-light">
                    <Link to="/dashboard" className="d-block" onClick={handleSimpleLinkClick}>
                        <Image src={appLogo} fluid />
                    </Link>

                    <button
                        className={`st-round-btn st-btn-transparent st-btn-sm d-flex align-items-center justify-content-center ${menuExpanded ? "menu-shrunk" : "expanded"}`}
                        onMouseEnter={handleMenuButtonMouseEnter}
                        onClick={handleMenuExpantion}>
                        <FeatherIcon
                            icon="menu"
                            size="18"
                            className="icon" />
                    </button>
                </div>
                {/* NAV ITEM */}
                <div className="alm_nav-item">
                    {/* NAV LINK */}
                    <NavLink
                        data-id="1"
                        to="/dashboard"
                        activeClassName="opened"
                        className="alm_nav-link text-decoration-none d-flex align-items-center"
                        onClick={handleSimpleLinkClick}>
                        {/* left sec */}
                        <div className="lt d-flex media-body">
                            <FeatherIcon
                                icon="home"
                                size="15"
                                className="icon" />
                            <span>Dashboard</span>
                        </div>
                    </NavLink>
                </div>

                {/* NAV ITEM */}
                <div className="alm_nav-item">
                    {/* NAV LINK */}
                    <Link
                        data-id="2"
                        to="/dashboard"
                        className={`
                            alm_nav-link text-decoration-none d-flex align-items-center
                            ${openedDropdowns.find(item => item === "2") ? "active" : ""}
                        `}
                        onClick={(ev) => handleSubMenuVisibility(ev, "2")}>
                        {/* left sec */}
                        <div className="lt d-flex media-body">
                            <FeatherIcon
                                icon="trending-up"
                                size="15"
                                className="icon" />
                            <span>My Sales</span>
                        </div>

                        {/* right sec */}
                        <div className="rt text-center">
                            <FeatherIcon
                                icon="chevron-right"
                                size="15"
                                className="icon" />
                        </div>
                    </Link>

                    {
                        /* sub menu */
                        openedDropdowns.find(item => item === "2") && (
                            <div className="alm_sub-menu">
                                {/* SUB NAV ITEM */}
                                <div className="alm_sub-nav-item">
                                    <Link to="/dashboard" className="alm_sub-nav-link text-decoration-none d-flex align-items-center">
                                        Orders
                                    </Link>
                                </div>

                                {/* SUB NAV ITEM */}
                                <div className="alm_sub-nav-item">
                                    <Link to="/dashboard" className="alm_sub-nav-link text-decoration-none d-flex align-items-center">
                                        Abandoned Carts
                                    </Link>
                                </div>

                                {/* SUB NAV ITEM */}
                                <div className="alm_sub-nav-item">
                                    <Link to="/dashboard" className="alm_sub-nav-link text-decoration-none d-flex align-items-center">
                                        Customers
                                    </Link>
                                </div>

                                {/* SUB NAV ITEM */}
                                <div className="alm_sub-nav-item">
                                    <Link to="/dashboard" className="alm_sub-nav-link text-decoration-none d-flex align-items-center">
                                        Order Editor
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                </div>

                {/* NAV ITEM */}
                <div className="alm_nav-item">
                    {/* NAV LINK */}
                    <Link
                        data-id="3"
                        to="/dashboard"
                        className={`
                            alm_nav-link text-decoration-none d-flex align-items-center
                            ${openedDropdowns.find(item => item === "3") ? "active" : ""}
                        `}
                        onClick={(ev) => handleSubMenuVisibility(ev, "3")}>
                        {/* left sec */}
                        <div className="lt d-flex media-body">
                            <FeatherIcon
                                icon="book"
                                size="15"
                                className="icon" />
                            <span>Catalog</span>
                        </div>

                        {/* right sec */}
                        <div className="rt text-center">
                            <FeatherIcon
                                icon="chevron-right"
                                size="15"
                                className="icon" />
                        </div>
                    </Link>

                    {
                        /* sub menu */
                        openedDropdowns.find(item => item === "3") && (
                            <div className="alm_sub-menu">
                                {/* SUB NAV ITEM */}
                                <div className="alm_sub-nav-item">
                                    <Link to="/dashboard" className="alm_sub-nav-link text-decoration-none d-flex align-items-center">
                                        Products
                                    </Link>
                                </div>

                                {/* SUB NAV ITEM */}
                                <div className="alm_sub-nav-item">
                                    <Link to="/dashboard" className="alm_sub-nav-link text-decoration-none d-flex align-items-center">
                                        Categories
                                    </Link>
                                </div>

                                {/* SUB NAV ITEM */}
                                <div className="alm_sub-nav-item">
                                    <Link to="/dashboard" className="alm_sub-nav-link text-decoration-none d-flex align-items-center">
                                        Gift Cards
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                </div>

                {/* NAV ITEM */}
                <div className="alm_nav-item">
                    {/* NAV LINK */}
                    <Link
                        data-id="4"
                        to="/dashboard"
                        className="alm_nav-link text-decoration-none d-flex align-items-center"
                        onClick={handleSimpleLinkClick}>
                        {/* left sec */}
                        <div className="lt d-flex media-body">
                            <FeatherIcon
                                icon="clipboard"
                                size="15"
                                className="icon" />
                            <span>Reports</span>
                        </div>
                    </Link>
                </div>

                {/* NAV ITEM */}
                <div className="alm_nav-item">
                    {/* NAV LINK */}
                    <Link
                        data-id="5"
                        to="/dashboard"
                        className={`
                            alm_nav-link text-decoration-none d-flex align-items-center
                            ${openedDropdowns.find(item => item === "5") ? "active" : ""}
                        `}
                        onClick={(ev) => handleSubMenuVisibility(ev, "5")}>
                        {/* left sec */}
                        <div className="lt d-flex media-body">
                            <FeatherIcon
                                icon="pie-chart"
                                size="15"
                                className="icon" />
                            <span>My Sales</span>
                        </div>

                        {/* right sec */}
                        <div className="rt text-center">
                            <FeatherIcon
                                icon="chevron-right"
                                size="15"
                                className="icon" />
                        </div>
                    </Link>

                    {
                        /* sub menu */
                        openedDropdowns.find(item => item === "5") && (
                            <div className="alm_sub-menu">
                                {/* SUB NAV ITEM */}
                                <div className="alm_sub-nav-item">
                                    <Link to="/dashboard" className="alm_sub-nav-link text-decoration-none d-flex align-items-center">
                                        Orders
                                    </Link>
                                </div>

                                {/* SUB NAV ITEM */}
                                <div className="alm_sub-nav-item">
                                    <Link to="/dashboard" className="alm_sub-nav-link text-decoration-none d-flex align-items-center">
                                        Abandoned Carts
                                    </Link>
                                </div>

                                {/* SUB NAV ITEM */}
                                <div className="alm_sub-nav-item">
                                    <Link to="/dashboard" className="alm_sub-nav-link text-decoration-none d-flex align-items-center">
                                        Customers
                                    </Link>
                                </div>

                                {/* SUB NAV ITEM */}
                                <div className="alm_sub-nav-item">
                                    <Link to="/dashboard" className="alm_sub-nav-link text-decoration-none d-flex align-items-center">
                                        Order Editor
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                </div>

                {/* NAV ITEM */}
                <div className="alm_nav-item">
                    {/* NAV LINK */}
                    <NavLink
                        data-id="6"
                        to="/settings"
                        activeClassName="opened"
                        className={`
                            alm_nav-link text-decoration-none d-flex align-items-center
                            ${openedDropdowns.find(item => item === "6") ? "active" : ""}
                        `}
                        onClick={(ev) => handleSubMenuVisibility(ev, "6")}>
                        {/* left sec */}
                        <div className="lt d-flex media-body">
                            <FeatherIcon
                                icon="settings"
                                size="15"
                                className="icon" />
                            <span>Settings</span>
                        </div>

                        {/* right sec */}
                        <div className="rt text-center">
                            <FeatherIcon
                                icon="chevron-right"
                                size="15"
                                className="icon" />
                        </div>
                    </NavLink>

                    {
                        /* sub menu */
                        openedDropdowns.find(item => item === "6") && (
                            <div className="alm_sub-menu">
                                {/* SUB NAV ITEM */}
                                <div className="alm_sub-nav-item">
                                    <NavLink
                                        to="/settings/users"
                                        activeClassName="opened"
                                        className="alm_sub-nav-link text-decoration-none d-flex align-items-center">
                                        Users
                                    </NavLink>
                                </div>
                            </div>
                        )
                    }
                </div>



                {/* fraction */}
                {/* <div className="frac">
                    <div className="frac-inner">
                    </div>
                </div> */}
            </div>
        </div>
    )
}
