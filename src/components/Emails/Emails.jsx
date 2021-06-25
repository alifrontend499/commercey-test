import React, { useState, useEffect } from 'react'

// redux
import { connect } from 'react-redux'

// bootstrap
import {
    Container
} from 'react-bootstrap'

// emails styles
import "./styles/emails-styles.scss"

// email table
import EmailsTableTopBar from './includes/EmailsTable/EmailsTableTopBar'
import EmailsTable from './includes/EmailsTable/EmailsTable'

// react toastify
import { toast } from 'react-toastify';

// APIs
import { getEmails, deleteEmailTemplate } from 'utlis/Apis/Emails_API'

// section loading
import SectionLoading from 'utlis/helpers/SectionLoading/SectionLoading'

// pagination
import Pagination from 'components/CommonComponents/Pagination'

// common healpers
import { debounce } from 'utlis/helpers/Common/CommonHelperFunctions'

function Emails(props) {
    // messages
    const ERROR_WHILE_FETCHING_EMAILS = "Unable to load Email Templates. please try again."
    const ERROR_WHILE_DELETING_EMAIL = "No detail found"
    const UNKNOWN_ERROR = "Unable to delete the email. please try again."
    const EMAIL_DELETED_SUCCESSFULLY = "Email template deleted successfully."
    const ERROR_WHILE_SEARCHING_EMAILS = "Unable to find the email templates. please try again."

    // consts
    const loadingCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const editColumnsType = "dropdown"  // dropdown or modal

    // refs

    // states
    const [emails, setEmails] = useState([])
    const [loading, setLoading] = useState(false)

    const [allCheckboxSelected, setAllCheckboxesSelected] = useState(false)

    const [column__TemplateName, setColumn__TemplateName] = useState(true)
    const [column__Subject, setColumn__Subject] = useState(true)
    const [column__Event, setColumn__Event] = useState(true)
    const [column__DateAdded, setColumn__DateAdded] = useState(true)
    const [column__to, setColumn__to] = useState(true)

    const [sectionLoadingVisible, setSectionLoadingVisible] = useState(false)

    const [paginationLinks, setPaginationLinks] = useState([])

    const [searchQuery, setSearchQuery] = useState("")

    // getting emails
    useEffect(() => {
        let URLParams = ''
        const serchQuery = props.location.search

        // if emails available then enabling section loading else enabling loading
        if (emails && emails.length) {
            // enabling section loading
            setSectionLoadingVisible(true)
        } else {
            // enabling loading
            setLoading(true)
        }

        // if search query is present in the URL
        if (serchQuery && serchQuery.length) {

            // if user is searching something
            if (searchQuery && searchQuery.length) {
                // updating the searchQueary
                URLParams = `${serchQuery.replace("?", "")}&keyword=${searchQuery}`
            } else {
                // updating the searchQueary
                URLParams = serchQuery.replace("?", "")
            }
        }

        // if search query is not present in the URL
        if (!serchQuery) {
            URLParams = ''
        }

        // getting emails
        getEmails(props.currentUser.userToken, URLParams).then(res => {
            // disabling section loading & loading
            setSectionLoadingVisible(false)
            setLoading(false)

            const resData = res.data

            // if request succesfull
            if (resData && resData.success) {
                // setting pagination links
                setPaginationLinks(resData.links)

                // settings emails
                setEmails(resData.data)
            }

            // if request is not succesfull
            if (resData && resData.error) {
                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(ERROR_WHILE_FETCHING_EMAILS, {
                    autoClose: 3000
                })
            }
        }).catch(err => {
            // console.log('err ', err)
            console.log('err ', err.message)

            // dismissing all the previous toasts first
            toast.dismiss();

            // showing the error message
            toast.error(ERROR_WHILE_FETCHING_EMAILS, {
                autoClose: 3000,
                onClose: () => {
                    // disabling section loading & loading
                    setSectionLoadingVisible(false)
                    setLoading(false)
                }
            })
        })
    }, [props])

    // selecting all the columns
    const handleSelectAllChange = (ev) => {
        const checkboxes = document.getElementsByClassName('all-checkboxes-selector-checkbox')

        // checking the checkbox and selecting all the checkboxes
        setAllCheckboxesSelected(!allCheckboxSelected)
        setTimeout(() => {
            if (ev.target.checked) {
                // all checkboxes selected
                checkboxes.length && Array.from(checkboxes).forEach(checkbox => {
                    checkbox.checked = true
                });
            } else {
                // all checkboxes not selected
                checkboxes.length && Array.from(checkboxes).forEach(checkbox => {
                    checkbox.checked = false
                });
            }
        }, 50);

    };

    // deleting
    const handleDelete = (ev, emailId) => {
        ev.preventDefault()

        var confirmation = window.confirm('Are you sure you want to delete this email?')

        if (confirmation) {
            // enabling the section loading
            setSectionLoadingVisible(true)

            // deleting data from the api
            deleteEmailTemplate(props.currentUser.userToken, emailId).then(res => {

                // disabling the section loading
                setSectionLoadingVisible(false)

                const deletedEmail = res.data
                // if delete succesfully
                if (deletedEmail.success) {
                    // updating emails state after deleting an email.
                    const filtersEmailsList = emails.filter(item => item.template_id !== emailId)

                    // settings updated emails
                    setEmails(filtersEmailsList)

                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.success(EMAIL_DELETED_SUCCESSFULLY, {
                        autoClose: 2500,
                    })
                }

                // if some error while deleting
                if (deletedEmail.error) {
                    console.log(ERROR_WHILE_DELETING_EMAIL, res)
                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.error(ERROR_WHILE_DELETING_EMAIL, {
                        autoClose: 2500,
                        onClose: () => {
                        }
                    })
                }

            }).catch(err => {
                // disabling the section loading
                setSectionLoadingVisible(false)

                // console.log('err ', err)
                console.log('err ', err.message)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(UNKNOWN_ERROR, {
                    autoClose: 3000,
                    onClose: () => {
                    }
                })
            })
        }
    }

    // searching
    const handleSearchChange = debounce(ev => {
        let URLParams = ''
        let searchQueryValue = ev.target.value

        // enabling section loading
        setSectionLoadingVisible(true)

        // if serch query has length
        if (searchQueryValue && searchQueryValue.length) {
            // setting search query data
            setSearchQuery(searchQueryValue)

            // setting params
            URLParams = "keyword=" + searchQueryValue
        }

        // if serch query does not have length
        if (!searchQueryValue) {
            // setting search query data
            setSearchQuery("")

            // setting params
            URLParams = ""
        }
        // getting emails
        getEmails(props.currentUser.userToken, URLParams).then(res => {
            // disabling section loading
            setSectionLoadingVisible(false)

            const resData = res.data

            // if request succesfull
            if (resData && resData.success) {
                // setting pagination links
                setPaginationLinks(resData.links)

                // settings emails
                setEmails(resData.data)
            }

            // if request is not succesfull
            if (resData && resData.error) {
                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(ERROR_WHILE_SEARCHING_EMAILS, {
                    autoClose: 3000
                })
            }
        }).catch(err => {
            // console.log('err ', err)
            console.log('err ', err.message)

            // dismissing all the previous toasts first
            toast.dismiss();

            // showing the error message
            toast.error(ERROR_WHILE_SEARCHING_EMAILS, {
                autoClose: 3000,
                onClose: () => {
                    // disabling section loading
                    setSectionLoadingVisible(false)
                }
            })
        })
    }, 500)

    return (
        <section id="app-emails" className="st-def-mar-TB">
            <Container fluid className="st-container">
                <div className="app-emails">
                    {/* HEADING WRAPPER */}
                    <div className="app-header-wrapper d-flex mb-2">
                        {/* heading */}
                        <p className="app-heading text-capitalize">email templates</p>
                    </div>

                    {/* CONTENT WRAPPER */}
                    <div className="app-content-container">
                        {/* app card */}
                        <div className="app-card">
                            <div className="app-card-content bg-white border st-border-light st-default-rounded-block mb-3">
                                {/* top bar */}
                                <div className="acc_top-bar border-bottom st-border-light">
                                    <EmailsTableTopBar
                                        editColumnsType={editColumnsType}

                                        column__TemplateName={column__TemplateName}
                                        column__Subject={column__Subject}
                                        column__Event={column__Event}
                                        column__to={column__to}
                                        column__DateAdded={column__DateAdded}

                                        setColumn__TemplateName={bool => setColumn__TemplateName(bool)}
                                        setColumn__Subject={bool => setColumn__Subject(bool)}
                                        setColumn__Event={bool => setColumn__Event(bool)}
                                        setColumn__to={bool => setColumn__to(bool)}
                                        setColumn__DateAdded={bool => setColumn__DateAdded(bool)}

                                        handleSearchChange={handleSearchChange}
                                    />
                                </div>

                                {/* table */}
                                <div className="st-listing-table emails-table">
                                    <EmailsTable
                                        allCheckboxSelected={allCheckboxSelected}
                                        handleSelectAllChange={ev => handleSelectAllChange(ev)}

                                        column__TemplateName={column__TemplateName}
                                        column__Subject={column__Subject}
                                        column__Event={column__Event}
                                        column__to={column__to}
                                        column__DateAdded={column__DateAdded}

                                        loadingCount={loadingCount}
                                        loading={loading}

                                        emails={emails}

                                        handleDelete={(ev, emailId) => handleDelete(ev, emailId)}
                                    />
                                    {
                                        /* SECTION LOADING */
                                        sectionLoadingVisible && (
                                            <SectionLoading />
                                        )
                                    }
                                </div>
                            </div>

                            {/* paginations */}
                            <div className="pagination-container d-flex justify-content-end">
                                <Pagination
                                    routeName={"/settings/emails"}
                                    paginationLinks={paginationLinks}
                                />
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

// const dispatchActionsToProps = dispatch => {
//     return {
//         setGlobalLoading: bool => dispatch(setGlobalLoading(bool)),
//     }
// }

export default connect(getDataFromStore, null)(Emails)