import React from 'react'

// bootstrap
import {
    Col,
    Table
} from 'react-bootstrap'

// icons : feather
import FeatherIcon from 'feather-icons-react';

export default function UserPermissions(props) {
    const { activePermissionTabId, handleUserPermissionsLinkClick, } = props

    return (
        // app card
        <div className="app-card mb-3">
            {/* card heading */}
            <div className="app-header-wrapper heading-sm mb-1">
                {/* heading */}
                <p className="app-heading text-capitalize">User Permissions</p>
            </div>

            {/* content */}
            <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-20">
                {/* info */}
                <p className="app-info-box mb-3">Permissions allow you to restrict which areas of the administration area this user can access.</p>

                <Col xs={12} className="px-0">
                    {/* user permissions */}
                    <div className="app-user-permissions">
                        <div className="aup-inner d-flex align-items-start">
                            {/* left sec */}
                            <div className="aup_lt position-sticky" style={{ top: 15 }}>
                                <div className="inner pad-15-R">
                                    {/* link */}
                                    <a href="/"
                                        className={`link text-decoration-none st-text-dark d-flex st-fs-15 
                                                        ${(activePermissionTabId === "1") ? "active" : ""}`}
                                        data-id="1"
                                        onClick={ev => handleUserPermissionsLinkClick(ev, "1")}>
                                        <FeatherIcon
                                            icon="home"
                                            size="14"
                                            className="icon" />
                                        <span>Dasboard</span>
                                    </a>

                                    {/* link */}
                                    <a href="/"
                                        className={`link text-decoration-none st-text-dark d-flex st-fs-15 
                                                        ${(activePermissionTabId === "2") ? "active" : ""}`}
                                        data-id="2"
                                        onClick={ev => handleUserPermissionsLinkClick(ev, "2")}>
                                        <FeatherIcon
                                            icon="trending-up"
                                            size="14"
                                            className="icon" />
                                        <span>My Sales</span>
                                    </a>

                                    {/* link */}
                                    <a href="/"
                                        className={`link text-decoration-none st-text-dark d-flex st-fs-15 
                                                        ${(activePermissionTabId === "3") ? "active" : ""}`}
                                        data-id="3"
                                        onClick={ev => handleUserPermissionsLinkClick(ev, "3")}>
                                        <FeatherIcon
                                            icon="book"
                                            size="14"
                                            className="icon" />
                                        <span>Catalog</span>
                                    </a>

                                    {/* link */}
                                    <a href="/"
                                        className={`link text-decoration-none st-text-dark d-flex st-fs-15 
                                                        ${(activePermissionTabId === "4") ? "active" : ""}`}
                                        data-id="4"
                                        onClick={ev => handleUserPermissionsLinkClick(ev, "4")}>
                                        <FeatherIcon
                                            icon="clipboard"
                                            size="14"
                                            className="icon" />
                                        <span>Reports</span>
                                    </a>

                                    {/* link */}
                                    <a href="/"
                                        className={`link text-decoration-none st-text-dark d-flex st-fs-15 
                                                        ${(activePermissionTabId === "5") ? "active" : ""}`}
                                        data-id="5"
                                        onClick={ev => handleUserPermissionsLinkClick(ev, "5")}>
                                        <FeatherIcon
                                            icon="home"
                                            size="14"
                                            className="icon" />
                                        <span>Dasboard</span>
                                    </a>

                                    {/* link */}
                                    <a href="/"
                                        className={`link text-decoration-none st-text-dark d-flex st-fs-15 
                                                        ${(activePermissionTabId === "6") ? "active" : ""}`}
                                        data-id="6"
                                        onClick={ev => handleUserPermissionsLinkClick(ev, "6")}>
                                        <FeatherIcon
                                            icon="trending-up"
                                            size="14"
                                            className="icon" />
                                        <span>My Sales</span>
                                    </a>

                                    {/* link */}
                                    <a href="/"
                                        className={`link text-decoration-none st-text-dark d-flex st-fs-15 
                                                        ${(activePermissionTabId === "7") ? "active" : ""}`}
                                        data-id="7"
                                        onClick={ev => handleUserPermissionsLinkClick(ev, "7")}>
                                        <FeatherIcon
                                            icon="book"
                                            size="14"
                                            className="icon" />
                                        <span>Catalog</span>
                                    </a>

                                    {/* link */}
                                    <a href="/"
                                        className={`link text-decoration-none st-text-dark d-flex st-fs-15 
                                                        ${(activePermissionTabId === "8") ? "active" : ""}`}
                                        data-id="8"
                                        onClick={ev => handleUserPermissionsLinkClick(ev, "8")}>
                                        <FeatherIcon
                                            icon="clipboard"
                                            size="14"
                                            className="icon" />
                                        <span>Reports</span>
                                    </a>
                                </div>
                            </div>

                            {/* right sec */}
                            <div className="aup_rt media-body border-start st-border-light pad-15-L">
                                <div className="inner bg-white border st-border-light st-default-rounded-block overflow-hidden">
                                    <div className="st-listing-table st-table-heading-dark st-table-padding-sm p-0 users-table">
                                        <Table responsive className="mb-0">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <p className="text-capitalize">
                                                            permissions
                                                        </p>
                                                    </th>
                                                    <th width={75} className="action">
                                                        <p className="text-capitalize text-center">
                                                            off
                                                        </p>
                                                    </th>
                                                    <th width={75} className="action">
                                                        <p className="text-capitalize text-center">
                                                            read
                                                        </p>
                                                    </th>
                                                    <th width={75} className="action">
                                                        <p className="text-capitalize text-center">
                                                            write
                                                        </p>
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p className="text-capitalize">
                                                            view sales
                                                        </p>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="1" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="1" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="1" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p className="text-capitalize">
                                                            view orders
                                                        </p>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="2" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="2" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="2" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p className="text-capitalize">
                                                            edit orders
                                                        </p>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="3" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="3" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="3" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p className="text-capitalize">
                                                            delete orders
                                                        </p>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="4" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="4" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="4" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p className="text-capitalize">
                                                            view cart
                                                        </p>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="4" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="4" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="4" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p className="text-capitalize">
                                                            view customer
                                                        </p>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="5" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="5" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="5" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p className="text-capitalize">
                                                            edit customer
                                                        </p>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="6" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="6" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="6" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p className="text-capitalize">
                                                            delete customer
                                                        </p>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="7" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="7" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="7" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p className="text-capitalize">
                                                            view sales
                                                        </p>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="8" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="8" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="8" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p className="text-capitalize">
                                                            view orders
                                                        </p>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="9" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="9" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="9" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p className="text-capitalize">
                                                            edit orders
                                                        </p>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="10" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="10" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="10" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p className="text-capitalize">
                                                            delete orders
                                                        </p>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="11" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="11" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="11" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p className="text-capitalize">
                                                            view cart
                                                        </p>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="12" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="12" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="12" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p className="text-capitalize">
                                                            view customer
                                                        </p>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="13" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="13" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="13" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p className="text-capitalize">
                                                            edit customer
                                                        </p>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="14" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="14" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="14" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p className="text-capitalize">
                                                            delete customer
                                                        </p>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="15" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="15" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="action text-center">
                                                        <label className="st-checkbox st-checkbox-primary d-inline-flex cursor-pointer">
                                                            <input type="radio" name="15" className="d-none" />
                                                            <span className="box d-flex align-items-center justify-content-center border">
                                                                <FeatherIcon
                                                                    icon="check"
                                                                    size="15"
                                                                    className="icon position-relative" />
                                                            </span>
                                                        </label>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </div>
        </div>
    )
}
