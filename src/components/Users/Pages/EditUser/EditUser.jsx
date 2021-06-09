import React, { useState, useRef, useEffect } from 'react'

// bootstrap
import {
    Container,
    Col,
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
import { toast, Slide } from 'react-toastify';

// includes
import UserDetails from './Includes/EditUser__UserDetails'

export default function EditUser(props) {
    // refs
    const submitButtonRef = useRef(null)

    // states
    const [editUserButtonDisable, setEditUserButtonDisable] = useState(false)
    const [editUserButtonLoading, setEditUserButtonLoading] = useState(false)

    const [userFirstName, setUserFirstName] = useState("")
    const [userLastName, setUserLastName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userType, setUserType] = useState("")
    const [userStatus, setUserStatus] = useState("")

    // edit user's values
    useEffect(() => {
        const locState = props.location.state ?? props.location.state

        // if state exists in the location
        if (locState) {
            const user = locState.userDetails
            setUserFirstName((user && user.firstName) ? user.firstName : "")
            setUserLastName((user && user.lastName) ? user.lastName : "")
            setUserEmail((user && user.email) ? user.email : "")
            setUserType((user && user.type) ? user.type : "")
            setUserStatus((user && user.status) ? user.status : "")
        }
    }, [props])

    // initial edit user form values
    const initialEditUserFormValues = {
        editUserFirstName: userFirstName,
        editUserLastName: userLastName,
        editUserEmail: userEmail,
        editUserType: userType,
        editUserStatus: userStatus
    }

    // handle edit user form validations
    const editUserFormValidationSchema = Yup.object({
        editUserFirstName: Yup.string().required('This field is required'),
        editUserLastName: Yup.string().required('This field is required'),
        editUserEmail: Yup.string().email('Invalid email address').required('This field is required'),
        editUserType: Yup.string().required('This field is required'),
        editUserStatus: Yup.string().required('This field is required'),
    })

    // handle edit user form submmision
    const onEditUserFormSubmit = values => {
        if (values) {

            // enabling the button and enabling loading
            setEditUserButtonDisable(true)
            setEditUserButtonLoading(true)

            setTimeout(() => {
                // disbling the button and enabling loading
                setEditUserButtonDisable(false)
                setEditUserButtonLoading(false)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing success message
                toast.success("User editd succesfully!", {
                    className: 'app-toast',
                    autoClose: 2500,
                    transition: Slide,
                    draggable: false,
                    hideProgressBar: true,
                    closeOnClick: false,
                })

            }, 1000);
        } else {
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
    return (
        <section id="app-users__edit-details" className="st-def-mar-TB">
            <Container fluid className="st-container">
                <div className="app-users__edit-details">
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
                                <p className="app-heading text-capitalize">Permissions</p>
                            </div>
                            <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-20">
                                <Col xs={12} md={9} lg={6} className="px-0">

                                </Col>
                            </div>
                        </div>

                        {/* app card : bottom-bar */}
                        <div className="app-card action-btns">
                            <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-15 d-flex align-items-center justify-content-end">
                                <Link to="/settings/users" className="st-btn st-btn-white no-min-width d-flex align-items-center justify-content-center me-3">
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

                </div>
            </Container>
        </section>
    )
}
