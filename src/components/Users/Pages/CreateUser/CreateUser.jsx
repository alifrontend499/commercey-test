import React, { useState, useRef, useEffect } from 'react'

// redux
import { connect } from 'react-redux'

// bootstrap
import {
    Container,
    Spinner
} from 'react-bootstrap'

// react router
import { Link } from 'react-router-dom'

// users styles
import "../../styles/users-styles.scss"

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
        createUserFirstName: "",
        createUserLastName: "",
        createUserEmail: "",
        createUserType: "",
        createUserTwoFactor: "",
    }

    // handle create user form validations
    const createUserFormValidationSchema = Yup.object({
        createUserFirstName: Yup.string().required('This field is required'),
        createUserLastName: Yup.string().required('This field is required'),
        createUserEmail: Yup.string().email('Invalid email address').required('This field is required'),
        createUserType: Yup.string().required('This field is required'),
        createUserTwoFactor: Yup.string().required('This field is required'),
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