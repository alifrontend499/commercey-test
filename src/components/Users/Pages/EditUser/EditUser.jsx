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
import UsersFormContentView from './Includes/UsersFormContentView'
import UserPermissions from './Includes/UserPermissions'

// APIs
import { getUserDetails, cancelGetUserDetailsApi, getAdminGroups, cancelAdminUsersApi, editUser } from 'utlis/Apis/AdminUsers_API'

// actions
import { setGlobalLoading } from 'redux/actions/actionCommon'

// messages
import {
    UNKNOWN_ERROR_OCCURED,
    ERROR_WHILE__NAME,
    USER_UPDATED_SUCCESSFULLY,
    ERROR_WHILE_UPDATING_USER,
    ERROR_WHILE_GETTING_USER_DETAILS
} from 'utlis/AppMessages/AppMessages'

function EditUser(props) {
    // refs
    const submitButtonRef = useRef(null)

    // states
    const [editButtonDisable, setEditButtonDisable] = useState(false)
    const [editButtonLoading, setUserButtonLoading] = useState(false)

    const [userId, setUserId] = useState("")

    const [activePermissionTabId, setActivePermissionTabId] = useState("2")

    const [adminGroups, setAdminGroups] = useState([])

    // on page load
    useEffect(() => {
        const userIdFromUrl = props.match.params;
        // setting user id from the url
        if (userIdFromUrl) {
            setUserId(userIdFromUrl.id)
        }

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

    // edit user's values
    useEffect(() => {
        const locState = props.location.state ?? props.location.state
        // if state with the user exists in the location
        if (locState) {
            const userData = locState.userDetails
            // setting the form fields
            formik.setFieldValue("editUserFirstName", userData?.first_name?.toString() ?? "")
            formik.setFieldValue("editUserLastName", userData?.last_name?.toString() ?? "")
            formik.setFieldValue("editUserEmail", userData?.email?.toString() ?? "")
            formik.setFieldValue("editUserType", userData?.group_id?.toString() ?? "")
            formik.setFieldValue("editUserTwoFactor", userData?.enable_two_factor?.toString() ?? "")
            formik.setFieldValue("editUserStatus", userData?.user_status?.toString() ?? "")
        }
    }, [props])

    // getting user's values
    useEffect(() => {
        const locState = props.location.state ?? props.location.state
        // if state with the user exists in the location
        if (!locState) {
            // enabling the global loading
            props.setGlobalLoading(true)

            // loading the user from the database
            const userId = props.match.params.id ?? ""

            // getting single user details
            getUserDetails(props.currentUser.userToken, userId).then(res => {
                const userData = res.data

                // disabling the global loading
                props.setGlobalLoading(false)
                // if request is success
                if (userData.success) {
                    // setting the form fields
                    formik.setFieldValue("editUserFirstName", userData?.data?.first_name?.toString() ?? "")
                    formik.setFieldValue("editUserLastName", userData?.data?.last_name?.toString() ?? "")
                    formik.setFieldValue("editUserEmail", userData?.data?.email?.toString() ?? "")
                    formik.setFieldValue("editUserType", userData?.data?.group_id?.toString() ?? "")
                    formik.setFieldValue("editUserTwoFactor", userData?.data?.enable_two_factor?.toString() ?? "")
                    formik.setFieldValue("editUserStatus", userData?.data?.user_status?.toString() ?? "")
                }

                // if request is not succeed
                if (userData.error) {
                    console.log(ERROR_WHILE_GETTING_USER_DETAILS, res)
                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.error(ERROR_WHILE_GETTING_USER_DETAILS, {
                        autoClose: 3000,
                    })
                }
            }).catch(err => {
                console.log(`${ERROR_WHILE__NAME} getUserDetails `, err.message)

                // disabling the global loading
                props.setGlobalLoading(false)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(UNKNOWN_ERROR_OCCURED, {
                    autoClose: 2500
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
        editUserFirstName: "",
        editUserLastName: "",
        editUserEmail: "",
        editUserType: "",
        editUserTwoFactor: "",
        editUserStatus: ""
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
            setEditButtonDisable(true)
            setUserButtonLoading(true)

            // saving the user in the database
            const dataToBeSaved = {
                login_id: userId,
                first_name: values.editUserFirstName,
                last_name: values.editUserLastName,
                email: values.editUserEmail,
                group_id: values.editUserType,
                enable_two_factor: values.editUserTwoFactor,
                user_status: values.editUserStatus,
            }

            // updating the user details from the database
            editUser(props.currentUser.userToken, dataToBeSaved).then(res => {
                // disbling the button and enabling loading
                setEditButtonDisable(false)
                setUserButtonLoading(false)

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

            }).catch(err => {
                console.log(`${ERROR_WHILE__NAME} editUser `, err.message)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(UNKNOWN_ERROR_OCCURED, {
                    autoClose: 2500,
                    onClose: () => {
                        // disabling global loading
                        setGlobalLoading(false)

                        // disbling the button and disbling loading
                        setEditButtonDisable(true)
                        setUserButtonLoading(true)
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
                            <UsersFormContentView
                                formik={formik}

                                adminGroups={adminGroups}

                                submitButtonRef={submitButtonRef}
                            />

                            <UserPermissions
                                activePermissionTabId={activePermissionTabId}

                                handleUserPermissionsLinkClick={handleUserPermissionsLinkClick}
                            />

                            {/* app card : bottom-bar */}
                            <div className={`app-card action-btns ${props.sideBarVisibility ? "" : "sidebar-expanded"}`}>
                                <div className="app-card-content bg-white border-top st-border-light d-flex align-items-center justify-content-end">
                                    <Link to="/settings/users" className="st-btn st-btn-link no-min-width d-flex align-items-center justify-content-center me-1">
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        className={`st-btn st-btn-primary d-flex align-items-center justify-content-center ${(editButtonDisable || Object.keys(formik.errors).length) ? "disabled" : ""}`}
                                        disabled={editButtonDisable || Object.keys(formik.errors).length}
                                        onClick={handleFormSubmission}>
                                        {
                                            editButtonLoading ? (
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
        currentUser: state.auth.currentUser,
        sideBarVisibility: state.common.sideBarVisibility
    };
}

const dispatchActionsToProps = dispatch => {
    return {
        setGlobalLoading: bool => dispatch(setGlobalLoading(bool)),
    }
}

export default connect(getDataFromStore, dispatchActionsToProps)(EditUser)