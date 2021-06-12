import React, { useState, useRef } from 'react'

// bootstrap
import {
    Container,
    Col,
    Spinner,
    Table
} from 'react-bootstrap'

// react router
import { Link } from 'react-router-dom'

// users styles
import "../../styles/users-styles.scss"

// icons : feather
import FeatherIcon from 'feather-icons-react';

// formik
import {
    useFormik, //hook for functonal components
} from 'formik'

// yup
import * as Yup from 'yup'

// react toastify
import { toast, Slide } from 'react-toastify';

// includes
import UserDetails from './Includes/CreateUser__UserDetails'

export default function CreateUser() {
    // refs
    const submitButtonRef = useRef(null)

    // states
    const [createUserButtonDisable, setCreateUserButtonDisable] = useState(false)
    const [createUserButtonLoading, setCreateUserButtonLoading] = useState(false)

    const [userFirstName, setUserFirstName] = useState("")
    const [userLastName, setUserLastName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userType, setUserType] = useState("")
    const [userStatus, setUserStatus] = useState("")

    const [activePermissionTabId, setActivePermissionTabId] = useState("2")

    // initial create user form values
    const initialCreateUserFormValues = {
        createUserFirstName: userFirstName,
        createUserLastName: userLastName,
        createUserEmail: userEmail,
        createUserType: userType,
        createUserStatus: userStatus
    }

    // handle create user form validations
    const createUserFormValidationSchema = Yup.object({
        createUserFirstName: Yup.string().required('This field is required'),
        createUserLastName: Yup.string().required('This field is required'),
        createUserEmail: Yup.string().email('Invalid email address').required('This field is required'),
        createUserType: Yup.string().required('This field is required'),
        createUserStatus: Yup.string().required('This field is required'),
    })

    // handle create user form submmision
    const onCreateUserFormSubmit = values => {
        if (values) {

            // enabling the button and enabling loading
            setCreateUserButtonDisable(true)
            setCreateUserButtonLoading(true)

            setTimeout(() => {
                // disbling the button and enabling loading
                setCreateUserButtonDisable(false)
                setCreateUserButtonLoading(false)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing success message
                toast.success("User created succesfully!", {
                    className: 'app-toast',
                    autoClose: 2500,
                    transition: Slide,
                    draggable: false,
                    hideProgressBar: true,
                    closeOnClick: false,
                })

                // ressetting all the fields to default
                setUserFirstName("")
                setUserLastName("")
                setUserEmail("")
                setUserType("")
                setUserStatus("")

            }, 1000);
        } else {
        }
    }

    // formik hook
    const formik = useFormik({
        initialValues: initialCreateUserFormValues,
        validationSchema: createUserFormValidationSchema,
        onSubmit: onCreateUserFormSubmit,
        enableReinitialize: true
    })

    // handle button submission
    const handleFormSubmission = (ev) => {
        ev.preventDefault()

        // triggering click on submit button
        submitButtonRef.current.click()
    }

    // handle user permissions link click
    const handleUserPermissionsLinkClick = (ev, dataId) => {
        ev.preventDefault()
        if(setActivePermissionTabId === dataId) {
            setActivePermissionTabId("")
        } else {
            setActivePermissionTabId(dataId)
        }
    }
    return (
        <section id="app-users__create-details" className="st-def-mar-TB">
            <Container fluid className="st-container">
                <div className="app-users__create-details">
                    {/* HEADING WRAPPER */}
                    <div className="app-header-wrapper mb-3">
                        {/* heading */}
                        <p className="app-heading text-capitalize">Create User</p>
                        <p className="app-desc">
                            Create a user who will have access to different parts of your store.
                            you can assign different users different roles.
                        </p>
                    </div>
                    {/* 1053753 */}

                    {/* CONTENT WRAPPER */}
                    <div className="app-content-container">
                        {/* app card */}
                        <div className="app-card mb-3 mb-lg-4">
                            {/* card heading */}
                            <div className="app-header-wrapper heading-sm mb-1">
                                {/* heading */}
                                <p className="app-heading text-capitalize">User Details</p>
                            </div>
                            <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-20-LR pad-20-T">
                                <Col xs={12} md={9} lg={6} className="px-0">
                                    <form
                                        onSubmit={formik.handleSubmit}
                                        noValidate
                                        autoComplete="off">
                                        <UserDetails
                                            formik={formik}
                                        />

                                        <button type="submit" ref={submitButtonRef} className="d-none">submit</button>
                                    </form>
                                </Col>
                            </div>
                        </div>

                        {/* app card */}
                        <div className="app-card mb-3">
                            {/* card heading */}
                            <div className="app-header-wrapper heading-sm mb-1">
                                {/* heading */}
                                <p className="app-heading text-capitalize">User Permissions</p>
                            </div>

                            {/* info */}
                            <p className="app-info-box mb-2">Permissions allow you to restrict which areas of the administration area this user can access.</p>

                            {/* content */}
                            <div className="app-card-content">
                                <Col xs={12} className="px-0">
                                    {/* user permissions */}
                                    <div className="app-user-permissions">
                                        <div className="aup-inner d-flex align-items-start">
                                            {/* left sec */}
                                            <div className="aup_lt position-sticky" style={{ top: 15 }}>
                                                <div className="inner bg-white border st-border-light st-default-rounded-block pad-15">
                                                    {/* link */}
                                                    <a href="/"
                                                        className={`link text-decoration-none st-text-dark d-inline-flex st-fs-15 pad-15-B 
                                                        ${(activePermissionTabId === "1") ? "active" : ""}`}
                                                        data-id="1"
                                                        onClick={ev => handleUserPermissionsLinkClick(ev, "1")}>
                                                        <FeatherIcon
                                                            icon="home"
                                                            size="14"
                                                            className="icon" />
                                                        <span>Dasboard</span>
                                                    </a> <br />

                                                    {/* link */}
                                                    <a href="/"
                                                        className={`link text-decoration-none st-text-dark d-inline-flex st-fs-15 pad-15-B 
                                                        ${(activePermissionTabId === "2") ? "active" : ""}`}
                                                        data-id="2"
                                                        onClick={ev => handleUserPermissionsLinkClick(ev, "2")}>
                                                        <FeatherIcon
                                                            icon="trending-up"
                                                            size="14"
                                                            className="icon" />
                                                        <span>My Sales</span>
                                                    </a> <br />

                                                    {/* link */}
                                                    <a href="/"
                                                        className={`link text-decoration-none st-text-dark d-inline-flex st-fs-15 pad-15-B 
                                                        ${(activePermissionTabId === "3") ? "active" : ""}`}
                                                        data-id="3"
                                                        onClick={ev => handleUserPermissionsLinkClick(ev, "3")}>
                                                        <FeatherIcon
                                                            icon="book"
                                                            size="14"
                                                            className="icon" />
                                                        <span>Catalog</span>
                                                    </a> <br />

                                                    {/* link */}
                                                    <a href="/"
                                                        className={`link text-decoration-none st-text-dark d-inline-flex st-fs-15 pad-15-B 
                                                        ${(activePermissionTabId === "4") ? "active" : ""}`}
                                                        data-id="4"
                                                        onClick={ev => handleUserPermissionsLinkClick(ev, "4")}>
                                                        <FeatherIcon
                                                            icon="clipboard"
                                                            size="14"
                                                            className="icon" />
                                                        <span>Reports</span>
                                                    </a> <br />

                                                    {/* link */}
                                                    <a href="/"
                                                        className={`link text-decoration-none st-text-dark d-inline-flex st-fs-15 pad-15-B 
                                                        ${(activePermissionTabId === "5") ? "active" : ""}`}
                                                        data-id="5"
                                                        onClick={ev => handleUserPermissionsLinkClick(ev, "5")}>
                                                        <FeatherIcon
                                                            icon="home"
                                                            size="14"
                                                            className="icon" />
                                                        <span>Dasboard</span>
                                                    </a> <br />

                                                    {/* link */}
                                                    <a href="/"
                                                        className={`link text-decoration-none st-text-dark d-inline-flex st-fs-15 pad-15-B 
                                                        ${(activePermissionTabId === "6") ? "active" : ""}`}
                                                        data-id="6"
                                                        onClick={ev => handleUserPermissionsLinkClick(ev, "6")}>
                                                        <FeatherIcon
                                                            icon="trending-up"
                                                            size="14"
                                                            className="icon" />
                                                        <span>My Sales</span>
                                                    </a> <br />

                                                    {/* link */}
                                                    <a href="/"
                                                        className={`link text-decoration-none st-text-dark d-inline-flex st-fs-15 pad-15-B 
                                                        ${(activePermissionTabId === "7") ? "active" : ""}`}
                                                        data-id="7"
                                                        onClick={ev => handleUserPermissionsLinkClick(ev, "7")}>
                                                        <FeatherIcon
                                                            icon="book"
                                                            size="14"
                                                            className="icon" />
                                                        <span>Catalog</span>
                                                    </a> <br />

                                                    {/* link */}
                                                    <a href="/"
                                                        className={`link text-decoration-none st-text-dark d-inline-flex st-fs-15 
                                                        ${(activePermissionTabId === "8") ? "active" : ""}`}
                                                        data-id="8"
                                                        onClick={ev => handleUserPermissionsLinkClick(ev, "8")}>
                                                        <FeatherIcon
                                                            icon="clipboard"
                                                            size="14"
                                                            className="icon" />
                                                        <span>Reports</span>
                                                    </a> <br />
                                                </div>
                                            </div>

                                            {/* right sec */}
                                            <div className="aup_rt media-body pad-15-L">
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
                                                                            action
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
                                                                            <input type="checkbox" className="d-none" />
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
                                                                            <input type="checkbox" className="d-none" />
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
                                                                            <input type="checkbox" className="d-none" />
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
                                                                            <input type="checkbox" className="d-none" defaultChecked={true} />
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
                                                                            <input type="checkbox" className="d-none" defaultChecked={true} />
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
                                                                            <input type="checkbox" className="d-none" />
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
                                                                            <input type="checkbox" className="d-none" defaultChecked={true} />
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
                                                                            <input type="checkbox" className="d-none" />
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
                                                                            <input type="checkbox" className="d-none" />
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
                                                                            <input type="checkbox" className="d-none" defaultChecked={true} />
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
                                                                            <input type="checkbox" className="d-none" />
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
                                                                            <input type="checkbox" className="d-none" />
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
                                                                            <input type="checkbox" className="d-none" />
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
                                                                            <input type="checkbox" className="d-none" />
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
                                                                            <input type="checkbox" className="d-none" />
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
                                                                            <input type="checkbox" className="d-none" />
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

                        {/* app card : bottom-bar */}
                        <div className="app-card action-btns">
                            <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-15 d-flex align-items-center justify-content-end">
                                <Link to="/settings/users" className="st-btn st-btn-link no-min-width d-flex align-items-center justify-content-center me-1">
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="st-btn st-btn-primary d-flex align-items-center justify-content-center"
                                    disabled={createUserButtonDisable}
                                    onClick={handleFormSubmission}>
                                    {
                                        createUserButtonLoading ? (
                                            <Spinner animation="border" size="sm" />
                                        ) : (
                                            <span>Create User</span>
                                        )
                                    }
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    )
}
