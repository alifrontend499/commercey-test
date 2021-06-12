import React, { useState, useRef } from 'react'

// bootstrap
import {
    Container,
    Col,
    Spinner
} from 'react-bootstrap'

// react router
import { Link } from 'react-router-dom'

// formik
import {
    useFormik, //hook for functonal components
} from 'formik'

// yup
import * as Yup from 'yup'

// react toastify
import { toast, Slide } from 'react-toastify';

// includes
import EmailDetails from './Includes/CreateEmail__EmailDetails'

export default function CreateEmail() {
    // refs
    const submitButtonRef = useRef(null)

    // states
    const [createEmailButtonDisable, setCreateEmailButtonDisable] = useState(false)
    const [createEmailButtonLoading, setCreateEmailButtonLoading] = useState(false)

    const [emailTemplateName, setEmailTemplateName] = useState("")
    const [emailSubject, setEmailSubject] = useState("")
    const [emailTo, setEmailTo] = useState("")
    // const [emailContent, setEmailContent] = useState("")

    // initial create email form values
    const initialCreateEmailFormValues = {
        emailTemplateName: emailTemplateName,
        emailSubject: emailSubject,
        emailTo: emailTo,
    }

    // handle create email form validations
    const createEmailFormValidationSchema = Yup.object({
        emailTemplateName: Yup.string().required('This field is required'),
        emailSubject: Yup.string().required('This field is required'),
        emailTo: Yup.string().required('This field is required'),
    })

    // handle create email form submmision
    const onCreateEmailFormSubmit = values => {
        if (values) {

            // enabling the button and enabling loading
            setCreateEmailButtonDisable(true)
            setCreateEmailButtonLoading(true)

            setTimeout(() => {
                // disbling the button and enabling loading
                setCreateEmailButtonDisable(false)
                setCreateEmailButtonLoading(false)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing success message
                toast.success("Email created succesfully!", {
                    className: 'app-toast',
                    autoClose: 2500,
                    transition: Slide,
                    draggable: false,
                    hideProgressBar: true,
                    closeOnClick: false,
                })

                // ressetting all the fields to default
                setEmailTemplateName("")
                setEmailSubject("")
                setEmailTo("")
                // setEmailContent("")

            }, 1000);
        } else {
        }
    }

    // formik hook
    const formik = useFormik({
        initialValues: initialCreateEmailFormValues,
        validationSchema: createEmailFormValidationSchema,
        onSubmit: onCreateEmailFormSubmit,
        enableReinitialize: true
    })

    // handle button submission
    const handleFormSubmission = (ev) => {
        ev.preventDefault()

        // triggering click on submit button
        submitButtonRef.current.click()
    }

    return (
        <section id="app-emails__create-details" className="st-def-mar-TB">
            <Container fluid className="st-container">
                <div className="app-emails__create-details">
                    {/* HEADING WRAPPER */}
                    <div className="app-header-wrapper mb-3">
                        {/* heading */}
                        <p className="app-heading text-capitalize">Create Email</p>
                        <p className="app-desc">
                            Create an email for different events like forgot password, create account etc.
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
                                    <p className="app-heading text-capitalize">Email Details</p>
                                </div>
                                <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-20-LR pad-20-T">
                                    <Col xs={12} md={9} lg={6} className="px-0">
                                        <EmailDetails
                                            formik={formik}
                                        />
                                    </Col>
                                </div>
                            </div>

                            {/* app card */}
                            <div className="app-card mb-3 mb-lg-4">
                                {/* card heading */}
                                <div className="app-header-wrapper heading-sm mb-1">
                                    {/* heading */}
                                    <p className="app-heading text-capitalize">Email Content</p>
                                </div>
                                <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-20-LR pad-20-T">
                                    <Col xs={12} md={9} lg={6} className="px-0">
                                        {/* form field */}
                                        <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.emailSubject && formik.errors.emailSubject) ? "has-msg msg-error" : ""}`}>
                                            <label>Subject</label>
                                            <div className="media-body st-form-input-container">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Subject"
                                                    id="emailSubject"
                                                    {...formik.getFieldProps('emailSubject')} />
                                                {
                                                    /* form message */
                                                    (formik.touched.emailSubject && formik.errors.emailSubject) && (
                                                        <div className="st-form-msg position-absolute">
                                                            <p className="st-fs-12">{formik.errors.emailSubject}</p>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </Col>

                                    <Col xs={12} md={9} lg={6} className="px-0">
                                        {/* form field */}
                                        <div className="st-form st-form-with-label-left d-flex flex-wrap align-items-start">
                                            <label>Content</label>
                                            <div className="media-body st-form-input-container">
                                                <textarea
                                                    rows="5"
                                                    placeholder="Content"
                                                    className="form-control"></textarea>
                                            </div>
                                        </div>
                                    </Col>
                                </div>
                            </div>

                            {/* app card : bottom-bar */}
                            <div className="app-card action-btns">
                                <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-15 d-flex align-items-center justify-content-end">
                                    <Link to="/settings/emails" className="st-btn st-btn-link no-min-width d-flex align-items-center justify-content-center me-1">
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        className="st-btn st-btn-primary d-flex align-items-center justify-content-center"
                                        disabled={createEmailButtonDisable}
                                        onClick={handleFormSubmission}>
                                        {
                                            createEmailButtonLoading ? (
                                                <Spinner animation="border" size="sm" />
                                            ) : (
                                                <span>Create Email</span>
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
        </section>
    )
}
