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
import EmailDetails from './Includes/EditEmail__EmailDetails'

// APIs
import { getEmailDetails, cancelGetEmailDetailsApi, getEmailEvents, cancelGetEmailEventsApi, editEmailTemplate } from 'utlis/Apis/Emails_API'

// actions
import { setGlobalLoading } from 'redux/actions/actionCommon'

// html editor
import HTML_Editor from 'utlis/helpers/HTML_Editor'

// messages
import {
    UNKNOWN_ERROR_OCCURED,
    ERROR_WHILE__NAME,
    EMAIL_UPDATED_SUCCESSFULLY,
    ERROR_WHILE_UPDATING_EMAIL,
    ERROR_WHILE_GETTING_EMAIL_DETAILS,
} from 'utlis/AppMessages/AppMessages'

function EditEmail(props) {
    // refs
    const submitButtonRef = useRef(null)

    // states
    const [emailId, setEmailId] = useState("")

    const [editEmailButtonDisable, setEditEmailButtonDisable] = useState(false)
    const [editEmailButtonLoading, setEditEmailButtonLoading] = useState(false)

    const [emailTemplateName, setEmailTemplateName] = useState("")
    const [emailEventName, setEmailEventTitle] = useState("")
    const [emailTo, setEmailTo] = useState("")
    const [emailFrom, setEmailFrom] = useState("")
    const [emailSubject, setEmailSubject] = useState("")
    const [emailCC, setEmailCC] = useState("")
    const [emailBCC, setEmailBCC] = useState("")
    const [emailContent, setEmailContent] = useState("")

    const [emailEvents, setEmailEvents] = useState([])

    const [emailTemplateId, setEmailTemplateId] = useState([])

    // on page load
    useEffect(() => {
        const emailIdFromUrl = props.match.params;
        // setting user id from the url
        if (emailIdFromUrl) {
            setEmailId(emailIdFromUrl.id)
        }

        // getting event id
        getEmailEvents(props.currentUser.userToken, emailId).then(res => {
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

    // geting form values from the url
    useEffect(() => {
        const locState = props.location.state ?? props.location.state

        // if state with the email exists in the location
        if (locState) {
            const email = locState.emailDetails
            setEmailTemplateId(email?.template_id)
            setEmailTemplateName(email?.template_title)
            setEmailEventTitle(email?.event_id)
            setEmailTo(email?.send_email_to)
            setEmailFrom(email?.email_from)
            setEmailSubject(email?.email_subject)
            setEmailCC(email?.cc_email)
            setEmailBCC(email?.bcc_email)
            setEmailContent(email?.email_body)
        }
    }, [props])

    // geting form values from the database if not found in the url
    useEffect(() => {
        const locState = props.location.state ?? props.location.state
        // if state with the user exists in the location
        if (!locState) {
            // enabling the global loading
            props.setGlobalLoading(true)
            // loading the user from the database
            const emailId = props.match.params.id ?? ""

            // getting single email details
            getEmailDetails(props.currentUser.userToken, emailId).then(res => {
                const email = res.data

                // disabling the global loading
                props.setGlobalLoading(false)

                // if request is success
                if (email.success) {
                    setEmailTemplateId(email?.data?.template_id)
                    setEmailTemplateName(email?.data?.template_title)
                    setEmailEventTitle(email?.data?.event_id)
                    setEmailTo(email?.data?.send_email_to)
                    setEmailFrom(email?.data?.email_from)
                    setEmailSubject(email?.data?.email_subject)
                    setEmailCC(email?.data?.cc_email)
                    setEmailBCC(email?.data?.bcc_email)
                    setEmailContent(email?.data?.email_body)
                }
                // if request is not succeed
                if (email.error) {
                    console.log(ERROR_WHILE_GETTING_EMAIL_DETAILS, res)

                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.error(ERROR_WHILE_GETTING_EMAIL_DETAILS, {
                        autoClose: 3000,
                    })
                }
            }).catch(err => {
                console.log(`${ERROR_WHILE__NAME} getEmailDetails `, err.message)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(UNKNOWN_ERROR_OCCURED, {
                    autoClose: 2500,
                    onClose: () => {
                        // disabling the global loading
                        props.setGlobalLoading(false)
                    }
                })
            })

            return () => {
                // disabling the global loading
                props.setGlobalLoading(false)

                // canceling admin users api when user leaves the component
                cancelGetEmailDetailsApi()
            }
        }

    }, [])

    // html editor
    const getHTML_editorResult = (data) => {
        // setting email content
        setEmailContent(data)
    }

    // initial edit email form values
    const initialEditFormValues = {
        emailTemplateName,
        emailEventName,
        emailTo,
        emailFrom,
        emailSubject,
        emailCC,
        emailBCC,
    }

    // handle edit email form validations
    const editFormValidationSchema = Yup.object({
        emailTemplateName: Yup.string().required('This field is required'),
        emailEventName: Yup.string().required('This field is required'),
        emailTo: Yup.string().required('This field is required'),
        emailFrom: Yup.string(),
        emailSubject: Yup.string().required('This field is required'),
        emailCC: Yup.string(),
        emailBCC: Yup.string(),
    })

    // handle edit email form submmision
    const onEmailFormSubmit = values => {
        if (values) {
            // enabling global loading
            setGlobalLoading(true)

            // disabling the button and enabling loading
            setEditEmailButtonDisable(true)
            setEditEmailButtonLoading(true)

            // saving the email in the database
            const dataToBeSaved = {
                template_id: emailTemplateId,
                template_title: values.emailTemplateName,
                email_subject: values.emailSubject,
                email_from: values.emailFrom,
                cc_email: values.emailCC,
                bcc_email: values.emailBCC,
                email_body: emailContent,
                send_email_to: values.emailTo,
                event_id: values.emailEventName,
            }

            // updating the user details from the database
            editEmailTemplate(props.currentUser.userToken, dataToBeSaved).then(res => {
                // disabling global loading
                setGlobalLoading(false)

                // enabling the button and disabling loading
                setEditEmailButtonDisable(false)
                setEditEmailButtonLoading(false)

                const emailUpdated = res.data

                // if successfully created
                if (emailUpdated.success) {

                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing success message
                    toast.success(EMAIL_UPDATED_SUCCESSFULLY, {
                        autoClose: 3000
                    })
                }

                // if some error
                if (emailUpdated.error) {
                    console.log(ERROR_WHILE_UPDATING_EMAIL, res)
                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.error(ERROR_WHILE_UPDATING_EMAIL, {
                        autoClose: 3000
                    })
                }
            }).catch(err => {
                console.log(`${ERROR_WHILE__NAME} editEmailTemplate `, err.message)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(UNKNOWN_ERROR_OCCURED, {
                    autoClose: 2500,
                    onClose: () => {
                        // disabling global loading
                        setGlobalLoading(false)

                        // enabling the button and disabling loading
                        setEditEmailButtonDisable(false)
                        setEditEmailButtonLoading(false)
                    }
                })
            })
        }
    }

    // formik hook
    const formik = useFormik({
        initialValues: initialEditFormValues,
        validationSchema: editFormValidationSchema,
        onSubmit: onEmailFormSubmit,
        enableReinitialize: true
    })

    // handle button submission
    const handleFormSubmission = (ev) => {
        ev.preventDefault()

        // triggering click on submit button
        submitButtonRef.current.click()
    }

    return (
        <section id="app-emails__edit-details" className="st-def-mar-TB">
            <Container fluid className="st-container">
                <div className="app-emails__edit-details">
                    {/* BACK BUTTON WRAPPER */}
                    <div className="back-button-wrapper mb-2">
                        <Link to="/settings/emails" className="text-decoration-none st-text-primary d-inline-flex align-items-center cursor-pointer st-fs-15">
                            <FeatherIcon
                                icon="arrow-left"
                                size="14"
                                className="icon me-1" />
                            <span>Back to Email Templates</span>
                        </Link>
                    </div>

                    {/* HEADING WRAPPER */}
                    <div className="app-header-wrapper mb-3">
                        {/* heading */}
                        <p className="app-heading text-capitalize">Edit Email</p>
                        <p className="app-desc">
                            Edit an email for different events like forgot password, create account etc.
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
                                                    defaultValue={emailContent}
                                                    getResult={data => getHTML_editorResult(data)}
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
                                        disabled={editEmailButtonDisable}
                                        onClick={handleFormSubmission}>
                                        {
                                            editEmailButtonLoading ? (
                                                <Spinner animation="border" size="sm" />
                                            ) : (
                                                <span>Save Changes</span>
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

export default connect(getDataFromStore, dispatchActionsToProps)(EditEmail)