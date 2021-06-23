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
import UserDetails from './Includes/EditUser__UserDetails'

// APIs
import { getUserDetails, cancelGetUserDetailsApi, getAdminGroups, cancelAdminUsersApi, editUser } from 'utlis/Apis/AdminUsers_API'

// actions
import { setGlobalLoading } from 'redux/actions/actionCommon'

function EditUser(props) {
    // error and success messages
    const SOME_ERROR_OCCURED = "Unable to load the User. please try again."    
    const USER_UPDATED_SUCCESSFULLY = "User detail updated successfully."
    const ERROR_WHILE_UPDATING_USER = "No detail found."

    // refs
    const submitButtonRef = useRef(null)

    // states
    const [editUserButtonDisable, setEditUserButtonDisable] = useState(false)
    const [editUserButtonLoading, setEditUserButtonLoading] = useState(false)

    const [userId, setUserId] = useState("")
    const [userFirstName, setUserFirstName] = useState("")
    const [userLastName, setUserLastName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userType, setUserType] = useState("")
    const [userTwoFactor, setUserTwoFactor] = useState("")
    const [userStatus, setUserStatus] = useState("")

    const [activePermissionTabId, setActivePermissionTabId] = useState("2")

    const [adminGroups, setAdminGroups] = useState([])

    // on page load
    useEffect(() => {
        const userIdFromUrl = props.match.params;
        // setting user id from the url
        if(userIdFromUrl) {
            setUserId(userIdFromUrl.id)
        }

        // gettings admin groups admin, superadmin, reporter etc.
        getAdminGroups(props.currentUser.userToken).then(res => {
            const adminGroupsData = res.data

            // if there's no error
            if (adminGroupsData.success) {
                setAdminGroups(adminGroupsData.data)
            }

            // if there's some error
            if (adminGroups.error) {
                console.log('Error occured!', res)
            }
        }).catch(err => {
            console.log('err ', err)
        })

        return () => {
            // canceling admin users api when user leaves the component
            cancelAdminUsersApi()
        }
    }, [])

    // edit user's values
    useEffect(() => {
        const locState = props.location.state ?? props.location.state
        // if state with the user exists in the location
        // console.log('locState ', locState)
        if (locState) {
            const user = locState.userDetails
            setUserFirstName(user && user.first_name.toString())
            setUserLastName(user && user.last_name.toString())
            setUserEmail(user && user.email.toString())
            setUserType(user && user.group_id.toString())
            setUserTwoFactor(user && user.enable_two_factor.toString())
            setUserStatus(user && user.user_status.toString())
        }
    }, [props])

    // getting user's values
    useEffect(() => {
        const locState = props.location.state ?? props.location.state
        // if state with the user exists in the location
        // console.log('locState ', locState)
        if (!locState) {
            // enabling the global loading
            props.setGlobalLoading(true)

            // loading the user from the database
            const userId = props.match.params.id ?? props.match.params.id

            // getting single user details
            getUserDetails(props.currentUser.userToken, userId).then(res => {
                const user = res.data
                // disabling the global loading
                props.setGlobalLoading(false)

                if (user) {
                    setUserFirstName(user && user.first_name.toString())
                    setUserLastName(user && user.last_name.toString().toString())
                    setUserEmail(user && user.email.toString())
                    setUserType(user && user.group_id.toString())
                    setUserTwoFactor(user && user.enable_two_factor.toString())
                    setUserStatus(user && user.user_status.toString())
                }
            }).catch(err => {
                // console.log('err ', err)
                console.log('err ', err.message)

                // showing the error message
                toast.error(SOME_ERROR_OCCURED, {
                    autoClose: 3000,
                })
            })

            return () => {
                // disabling the global loading
                props.setGlobalLoading(false)

                // canceling admin users api when user leaves the component
                cancelGetUserDetailsApi()
            }
        }
    }, [])

    // initial edit user form values
    const initialEditUserFormValues = {
        editUserFirstName: userFirstName,
        editUserLastName: userLastName,
        editUserEmail: userEmail,
        editUserType: userType,
        editUserTwoFactor: userTwoFactor,
        editUserStatus: userStatus
    }

    // handle edit user form validations
    const editUserFormValidationSchema = Yup.object({
        editUserFirstName: Yup.string().required('This field is required'),
        editUserLastName: Yup.string().required('This field is required'),
        editUserEmail: Yup.string().email('Invalid email address').required('This field is required'),
        editUserType: Yup.string().required('This field is required'),
        editUserTwoFactor: Yup.string().required('This field is required'),
        editUserStatus: Yup.string().required('This field is required'),
    })

    // handle edit user form submmision
    const onEditUserFormSubmit = values => {
        if (values) {
            // enabling global loading
            setGlobalLoading(true)

            // enabling the button and enabling loading
            setEditUserButtonDisable(true)
            setEditUserButtonLoading(true)

            // saving the user in the database
            const userToBeSaved = {
                login_id: userId,
                first_name: values.editUserFirstName,
                last_name: values.editUserLastName,
                email: values.editUserEmail,
                group_id: values.editUserType,
                enable_two_factor: values.editUserTwoFactor,
                user_status: values.editUserStatus,
            }

            // console.log("userToBeSaved ", userToBeSaved)

            // updating the user details from the database
            editUser(props.currentUser.userToken, userToBeSaved).then(res => {
                // disbling the button and enabling loading
                setEditUserButtonDisable(false)
                setEditUserButtonLoading(false)

                // disabling global loading
                setGlobalLoading(false)

                const userEdited = res.data

                // if successfully created
                if (userEdited.success) {

                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing success message
                    toast.success(USER_UPDATED_SUCCESSFULLY, {
                        autoClose: 3000
                    })
                }

                // if some error
                if (userEdited.error) {
                    console.log(ERROR_WHILE_UPDATING_USER, res)
                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.error(ERROR_WHILE_UPDATING_USER, {
                        autoClose: 3000
                    })
                }

                // console.log('edited user results ', userEdited)

            }).catch(err => {
                // console.log('err ', err)
                console.log('err ', err.message)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(SOME_ERROR_OCCURED, {
                    autoClose: 3000,
                    onClose: () => {
                        // disabling global loading
                        setGlobalLoading(false)

                        // disbling the button and disbling loading
                        setEditUserButtonDisable(true)
                        setEditUserButtonLoading(true)
                    }
                })
            })


        }
    }

    // formik hook
    const formik = useFormik({
        initialValues: initialEditUserFormValues,
        validationSchema: editUserFormValidationSchema,
        onSubmit: onEditUserFormSubmit,
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
        <section id="app-users__edit-details" className="st-def-mar-TB">
            <Container fluid className="st-container">
                <div className="app-users__edit-details">
                    {/* BACK BUTTON WRAPPER */}
                    <div className="back-button-wrapper mb-2">
                        <Link to="/settings/users" className="text-decoration-none st-text-primary d-inline-flex align-items-center cursor-pointer st-fs-15">
                            <FeatherIcon
                                icon="arrow-left"
                                size="14"
                                className="icon me-1" />
                            <span>Back to Users</span>
                        </Link>
                    </div>

                    {/* HEADING WRAPPER */}
                    <div className="app-header-wrapper mb-3">
                        {/* heading */}
                        <p className="app-heading text-capitalize">Edit User</p>
                        <p className="app-desc">
                            Edit a user who will have access to different parts of your store.
                            you can assign different users different roles.
                        </p>
                    </div>
                    {/* 1053753 */}

                    {/* CONTENT WRAPPER */}
                    <form
                        onSubmit={formik.handleSubmit}
                        noValidate
                        autoComplete="off">
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
                                        <UserDetails
                                            formik={formik}
                                            adminGroups={adminGroups}
                                        />
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
                                            <div className="aup-inner d-flex flex-wrap align-items-start">
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
                                        className="st-btn st-btn-primary d-flex align-items-center justify-content-center"
                                        disabled={editUserButtonDisable}
                                        onClick={handleFormSubmission}>
                                        {
                                            editUserButtonLoading ? (
                                                <Spinner animation="border" size="sm" />
                                            ) : (
                                                <span>Save Details</span>
                                            )
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button type="submit" ref={submitButtonRef} className="d-none">submit</button>
                    </form>

                </div>
            </Container>
        </section >
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

export default connect(getDataFromStore, dispatchActionsToProps)(EditUser)