import React, { useState, useRef } from 'react'

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

    // initial create user form values
    const initialCreateUserFormValues = {
        createUserFirstName: userFirstName,
        createUserLastName: userLastName,
        createUserEmail: userEmail,
        createUserType: userType,
        createUserStatus: userStatus
    }

    console.log('initialCreateUserFormValues ', initialCreateUserFormValues)

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
