import React, { useState, useRef, useEffect } from 'react'

// redux
import { connect } from 'react-redux'

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
import { toast } from 'react-toastify';

// includes
import EmailDetails from './Includes/CreateEmail__EmailDetails'

// APIs
import { getEmailEvents, cancelGetEmailEventsApi, addEmailTemplate } from 'utlis/Apis/Emails_API'

// actions
import { setGlobalLoading } from 'redux/actions/actionCommon'

// html editor
import HTML_Editor from 'utlis/helpers/HTML_Editor'

function CreateEmail(props) {
    // error and success messages
    const SOME_ERROR_OCCURED = "Unable to create the email template. please try again."
    const EMAIL_CREATED_SUCCESSFULLY = "Email template created successfully."
    const ERROR_WHILE_CREATING_EMAIL = "Error occured!! please check if all the required fields are filled correctly."

    // refs
    const submitButtonRef = useRef(null)

    // states
    const [createButtonDisable, setCreateButtonDisable] = useState(false)
    const [createButtonLoading, setCreateButtonLoading] = useState(false)

    const [emailTemplateName, setEmailTemplateName] = useState("")
    const [emailEventName, setEmailEventTitle] = useState("")
    const [emailTo, setEmailTo] = useState("")
    const [emailFrom, setEmailFrom] = useState("")
    const [emailSubject, setEmailSubject] = useState("")
    const [emailCC, setEmailCC] = useState("")
    const [emailBCC, setEmailBCC] = useState("")
    const [emailContent, setEmailContent] = useState("")

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
            // console.log('err ', err)
            console.log('err ', err.message)
        })

        return () => {
            // canceling admin users api when user leaves the component
            cancelGetEmailEventsApi()
        }
    }, [])

    // initial create email form values
    const initialCreateFormValues = {
        emailTemplateName,
        emailEventName,
        emailTo,
        emailFrom,
        emailSubject,
        emailCC,
        emailBCC
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
            const emailToBeSaved = {
                template_title: values.emailTemplateName,
                email_subject: values.emailSubject,
                email_from: values.emailFrom,
                cc_email: values.emailCC,
                bcc_email: values.emailBCC,
                email_body: emailContent,
                send_email_to: values.emailTo,
                event_id: values.emailEventName,
            }

            // saving email template
            addEmailTemplate(props.currentUser.userToken, emailToBeSaved).then(res => {
                // disabling global loading
                setGlobalLoading(false)

                // disbling the button and enabling loading
                setCreateButtonDisable(false)
                setCreateButtonLoading(false)

                const addingEmail = res.data

                // if request is success
                if (addingEmail.success) {
                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.success(EMAIL_CREATED_SUCCESSFULLY, {
                        autoClose: 2500,
                        onClose: () => {
                            // empty the fields
                            setEmailTemplateName("")
                            setEmailEventTitle("")
                            setEmailTo("")
                            setEmailFrom("")
                            setEmailSubject("")
                            setEmailCC("")
                            setEmailBCC("")
                            setEmailContent("")

                            // redirecting to users
                            props.history.push('/settings/emails', {
                                shouldReload: true
                            })
                        }
                    })
                }

                // if request is not succeed
                if (addingEmail.error) {
                    console.log(ERROR_WHILE_CREATING_EMAIL, res)

                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.error(ERROR_WHILE_CREATING_EMAIL, {
                        autoClose: 3000,
                    })
                }
            }).catch(err => {
                console.log('err ', err.message)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(SOME_ERROR_OCCURED, {
                    autoClose: 3000,
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
        setEmailContent(data)
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
                                            emailEvents={emailEvents}
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
                                <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-20">

                                    <Col xs={12} md={9} lg={10} className="px-0">
                                        {/* form field */}
                                        <div className={`st-form st-form-with-label-left d-flex flex-wrap`}>
                                            <label>Content</label>
                                            <div className="media-body">
                                                <HTML_Editor
                                                    getResult={getHTML_editorResult}
                                                />
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
        currentUser: state.auth.currentUser
    };
}

const dispatchActionsToProps = dispatch => {
    return {
        setGlobalLoading: bool => dispatch(setGlobalLoading(bool)),
    }
}

export default connect(getDataFromStore, dispatchActionsToProps)(CreateEmail)