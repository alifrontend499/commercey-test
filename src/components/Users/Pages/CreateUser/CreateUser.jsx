import React, { useState, useRef, useEffect } from 'react'

// redux
import { connect } from 'react-redux'

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
import { toast } from 'react-toastify';

// includes
import UserDetails from './Includes/CreateUser__UserDetails'

// APIs
import { getAdminGroups, cancelAdminUsersApi, createUser } from 'utlis/Apis/AdminUsers_API'

// actions
import { setGlobalLoading } from 'redux/actions/actionCommon'

// messages
import {
    UNKNOWN_ERROR_OCCURED,
    ERROR_WHILE__NAME,
    USER_ADDED_SUCCESSFULLY,
    ERROR_WHILE_CREATING_USER,
} from 'utlis/AppMessages/AppMessages'

function CreateUser(props) {

    // refs
    const submitButtonRef = useRef(null)

    // states
    const [createButtonDisable, setCreateButtonDisable] = useState(false)
    const [createButtonLoading, setCreateButtonLoading] = useState(false)

    const [userFirstName, setUserFirstName] = useState("")
    const [userLastName, setUserLastName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userType, setUserType] = useState("")
    const [userTwoFactor, setUserTwoFactor] = useState("")
    // const [userStatus, setUserStatus] = useState("")

    const [activePermissionTabId, setActivePermissionTabId] = useState("2")

    const [adminGroups, setAdminGroups] = useState([])

    // on page load
    useEffect(() => {
        // gettings admin groups admin, superadmin, reporter etc.
        getAdminGroups(props.currentUser.userToken).then(res => {
            const adminGroupsData = res.data

            // if there's no error
            if (adminGroupsData.success) {
                setAdminGroups(adminGroupsData.data.data)
            }

            // if there's some error
            if (adminGroups.error) {
                console.log('Error occured while loading admin groups!', res)
            }
        }).catch(err => {
            console.log(`${ERROR_WHILE__NAME} getAdminGroups `, err.message)

            // dismissing all the previous toasts first
            toast.dismiss();

            // showing the error message
            toast.error(UNKNOWN_ERROR_OCCURED, {
                autoClose: 2500
            })
        })

        return () => {
            // canceling admin users api when user leaves the component
            cancelAdminUsersApi()
        }
    }, [])

    // initial create user form values
    const initialCreateUserFormValues = {
        createUserFirstName: userFirstName,
        createUserLastName: userLastName,
        createUserEmail: userEmail,
        createUserType: userType,
        createUserTwoFactor: userTwoFactor,
        // createUserStatus: userStatus
    }

    // handle create user form validations
    const createUserFormValidationSchema = Yup.object({
        createUserFirstName: Yup.string().required('This field is required'),
        createUserLastName: Yup.string().required('This field is required'),
        createUserEmail: Yup.string().email('Invalid email address').required('This field is required'),
        createUserType: Yup.string().required('This field is required'),
        createUserTwoFactor: Yup.string().required('This field is required'),
        // createUserStatus: Yup.string().required('This field is required'),
    })

    // handle create user form submmision
    const onCreateUserFormSubmit = values => {
        if (values) {
            // enabling global loading
            setGlobalLoading(true)

            // enabling the button and enabling loading
            setCreateButtonDisable(true)
            setCreateButtonLoading(true)

            // saving the user in the database
            const userToBeSaved = {
                first_name: values.createUserFirstName,
                last_name: values.createUserLastName,
                email: values.createUserEmail,
                group_id: values.createUserType,
                enable_two_factor: values.createUserTwoFactor,
            }
            createUser(props.currentUser.userToken, userToBeSaved).then(res => {
                // disabling global loading
                setGlobalLoading(false)

                const addingData = res.data

                // if successfully created
                if (addingData.success) {
                    // disabling the button loading
                    setCreateButtonLoading(false)

                    // scrolling the window to top
                    window.scrollTo(0, 0)

                    // resetting the form
                    formik.resetForm()

                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing success message
                    toast.success(USER_ADDED_SUCCESSFULLY, {
                        autoClose: 2000,
                        onClose: () => {
                            // redirecting to users
                            props.history.push('/settings/users', {
                                shouldReload: true
                            })
                        }
                    })
                }

                // if some error
                if (addingData.error) {
                    console.log(ERROR_WHILE_CREATING_USER, res)

                    // enabling the button and disabling loading
                    setCreateButtonDisable(false)
                    setCreateButtonLoading(false)

                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.error(ERROR_WHILE_CREATING_USER, {
                        autoClose: 3000
                    })
                }

            }).catch(err => {
                console.log(`${ERROR_WHILE__NAME} createUser `, err.message)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(UNKNOWN_ERROR_OCCURED, {
                    autoClose: 2500,
                    onClose: () => {
                        // disabling global loading
                        setGlobalLoading(false)

                        // disbling the button and disbling loading
                        setCreateButtonDisable(false)
                        setCreateButtonLoading(false)
                    }
                })
            })
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
        if (setActivePermissionTabId === dataId) {
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
                                            adminGroups={adminGroups}
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

                        {/* app card : bottom-bar */}
                        <div className="app-card action-btns">
                            <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-15 d-flex align-items-center justify-content-end">
                                <Link to="/settings/users" className="st-btn st-btn-link no-min-width d-flex align-items-center justify-content-center me-1">
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className={`st-btn st-btn-primary d-flex align-items-center justify-content-center ${(createButtonDisable || Object.keys(formik.errors).length) ? "disabled" : ""}`}
                                    disabled={createButtonDisable}
                                    onClick={handleFormSubmission}>
                                    {
                                        createButtonLoading ? (
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


const getDataFromStore = state => {
    return {
        currentUser: state.auth.currentUser
    };
}

const dispatchActionsToProps = dispatch => {
    return {
        setGlobalLoading: bool => dispatch(setGlobalLoading(bool)),
    }
}

export default connect(getDataFromStore, dispatchActionsToProps)(CreateUser)