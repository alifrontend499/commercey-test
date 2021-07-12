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

// formik
import {
    useFormik, //hook for functonal components
} from 'formik'

// yup
import * as Yup from 'yup'

// react toastify
import { toast } from 'react-toastify';

// includes
import EmailsFormContentView from './Includes/EmailsFormContentView'

// APIs
import { getEmailEvents, cancelGetEmailEventsApi, addEmailTemplate } from 'utlis/Apis/Emails_API'

// actions
import { setGlobalLoading } from 'redux/actions/actionCommon'

// messages
import {
    UNKNOWN_ERROR_OCCURED,
    ERROR_WHILE__NAME,
    EMAIL_ADDED_SUCCESSFULLY,
    ERROR_WHILE_CREATING_EMAIL,
} from 'utlis/AppMessages/AppMessages'

function CreateEmail(props) {
    // refs
    const submitButtonRef = useRef(null)

    // states
    const [createButtonDisable, setCreateButtonDisable] = useState(false)
    const [createButtonLoading, setCreateButtonLoading] = useState(false)

    const [emailEvents, setEmailEvents] = useState([])

    // on page load
    useEffect(() => {
        // getting event id
        getEmailEvents(props.currentUser.userToken).then(res => {
            const emailEvents = res.data

            // if request is success
            if (emailEvents.success) {
                setEmailEvents(emailEvents.data.data)
            }

            // if request is not succeed
            if (emailEvents.error) {
                console.log('Error occured while loading email events!', res)
            }
        }).catch(err => {
            console.log(`${ERROR_WHILE__NAME} getEmailEvents `, err.message)

            // dismissing all the previous toasts first
            toast.dismiss();

            // showing the error message
            toast.error(UNKNOWN_ERROR_OCCURED, {
                autoClose: 2500
            })
        })

        return () => {
            // canceling admin users api when user leaves the component
            cancelGetEmailEventsApi()
        }
    }, [])

    // initial create email form values
    const initialCreateFormValues = {
        emailTemplateName: "",
        emailEventName: "",
        emailTo: "",
        emailFrom: "",
        emailSubject: "",
        emailCC: "",
        emailBCC: "",
        emailContent: "",
    }

    // handle create email form validations
    const createFormValidationSchema = Yup.object({
        emailTemplateName: Yup.string().required('This field is required'),
        emailEventName: Yup.string().required('This field is required'),
        emailTo: Yup.string().required('This field is required'),
        emailFrom: Yup.string(),
        emailSubject: Yup.string().required('This field is required'),
        emailCC: Yup.string(),
        emailBCC: Yup.string(),
        emailContent: Yup.string(),
    })

    // handle create email form submmision
    const onCreateFormSubmit = values => {
        if (values) {
            // enabling global loading
            setGlobalLoading(true)

            // enabling the button and enabling loading
            setCreateButtonDisable(true)
            setCreateButtonLoading(true)

            // saving the email in the database
            const dataToBeSaved = {
                template_title: values.emailTemplateName,
                email_subject: values.emailSubject,
                email_from: values.emailFrom,
                cc_email: values.emailCC,
                bcc_email: values.emailBCC,
                email_body: values.emailContent,
                send_email_to: values.emailTo,
                event_id: values.emailEventName,
            }

            // saving email template
            addEmailTemplate(props.currentUser.userToken, dataToBeSaved).then(res => {
                // disabling global loading
                setGlobalLoading(false)

                const addingEmail = res.data

                // if request is success
                if (addingEmail.success) {
                    // disabling the button loading
                    setCreateButtonLoading(false)

                    // scrolling the window to top
                    window.scrollTo(0, 0)

                    // resetting the form
                    formik.resetForm()

                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.success(EMAIL_ADDED_SUCCESSFULLY, {
                        autoClose: 2000,
                        onClose: () => {
                            // redirecting to emails
                            props.history.push('/settings/emails', {
                                shouldReload: true
                            })
                        }
                    })
                }

                // if request is not succeed
                if (addingEmail.error) {
                    console.log(ERROR_WHILE_CREATING_EMAIL, res)

                    // enabling the button and disabling loading
                    setCreateButtonDisable(false)
                    setCreateButtonLoading(false)

                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.error(ERROR_WHILE_CREATING_EMAIL, {
                        autoClose: 3000,
                    })
                }
            }).catch(err => {
                console.log(`${ERROR_WHILE__NAME} getEmailEvents `, err.message)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(UNKNOWN_ERROR_OCCURED, {
                    autoClose: 2500,
                    onClose: () => {
                        // disabling global loading
                        setGlobalLoading(false)

                        // disbling the button and enabling loading
                        setCreateButtonDisable(false)
                        setCreateButtonLoading(false)
                    }
                })
            })
        }
    }

    // formik hook
    const formik = useFormik({
        initialValues: initialCreateFormValues,
        validationSchema: createFormValidationSchema,
        onSubmit: onCreateFormSubmit,
        enableReinitialize: true
    })

    // handle button submission
    const handleFormSubmission = (ev) => {
        ev.preventDefault()

        // triggering click on submit button
        submitButtonRef.current.click()
    }

    // html editor
    const getHTML_editorResult = (data) => {
        // setting email content
        formik.setFieldValue("emailContent", data)
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

                            <EmailsFormContentView
                                formik={formik}

                                emailEvents={emailEvents}

                                getHTML_editorResult={getHTML_editorResult}
                            />

                            {/* app card : bottom-bar */}
                            <div className={`app-card action-btns ${props.sideBarVisibility ? "" : "sidebar-expanded"}`}>
                                <div className="app-card-content bg-white border-top st-border-light d-flex align-items-center justify-content-end">
                                    <Link to="/settings/emails" className="st-btn st-btn-link no-min-width d-flex align-items-center justify-content-center me-1">
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

export default connect(getDataFromStore, dispatchActionsToProps)(CreateEmail)