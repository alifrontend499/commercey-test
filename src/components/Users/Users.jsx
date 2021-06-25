import React, { useState, useEffect } from 'react'

// redux
import { connect } from 'react-redux'

// bootstrap
import {
    Container,
} from 'react-bootstrap'

// users styles
import "./styles/users-styles.scss"

// user table
import UserTableTopBar from './includes/UserTable/UserTableTopBar'
import UserTable from './includes/UserTable/UserTable'

// react toastify
import { toast } from 'react-toastify';

// APIs
import { getUsers, deleteUser } from 'utlis/Apis/AdminUsers_API'

// section loading
import SectionLoading from 'utlis/helpers/SectionLoading/SectionLoading'

// pagination
import Pagination from 'components/CommonComponents/Pagination'

// common healpers
import { debounce } from 'utlis/helpers/Common/CommonHelperFunctions'

function Users(props) {
    // messages
    const ERROR_WHILE_FETCHING_USER = "Unable to load Users. please try again."
    const USER_DELETED_SUCCESSFULLY = "Admin user deleted successfully."
    const NO_USER_FOUND_DELETING_USER = "No detail found."
    const ERROR_WHILE_DELETING_USER = "Unable to delete the user. please try again."
    const ERROR_WHILE_SEARCHING_USERS = "Unable to find the User. please try again."

    // consts
    const loadingCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    // refs

    // states
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const [allCheckboxSelected, setAllCheckboxesSelected] = useState(false)

    const [column__User, setColumn__User] = useState(true)
    const [column__Email, setColumn__Email] = useState(true)
    const [column__Type, setColumn__Type] = useState(true)
    const [column__TwoFactors, setColumn__TwoFactors] = useState(true)
    const [column__LastActive, setColumn__LastActive] = useState(true)
    const [column__Status, setColumn__Status] = useState(true)

    const [sectionLoadingVisible, setSectionLoadingVisible] = useState(false)

    const [paginationLinks, setPaginationLinks] = useState([])

    const [searchQuery, setSearchQuery] = useState("")

    // useEffect: getting users data
    useEffect(() => {
        let URLParams = ''
        const serchQuery = props.location.search

        // if users available then enabling section loading else enabling loading
        if (users && users.length) {
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

        // getting admin users data
        getUsers(props.currentUser.userId, URLParams).then(res => {
            // disabling section loading & loading
            setSectionLoadingVisible(false)
            setLoading(false)

            const resData = res.data

            // if request succesfull
            if (resData && resData.success) {
                // setting pagination links
                setPaginationLinks(resData.links)

                // settings users
                setUsers(resData.data)
            }

            // if request is not succesfull
            if (resData && resData.error) {
                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(ERROR_WHILE_FETCHING_USER, {
                    autoClose: 3000
                })
            }
        }).catch(err => {
            console.log('err ', err.message)

            // dismissing all the previous toasts first
            toast.dismiss();

            // showing the error message
            toast.error(ERROR_WHILE_FETCHING_USER, {
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

        // checking the checkbox and selecting all checkboxes
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
    const handleDelete = (ev, userId) => {
        ev.preventDefault()
        // dismissing all the previous toasts first
        toast.dismiss();

        var confirmation = window.confirm('Are you sure you want to delete this user?')
        // if user confirms action
        if (confirmation) {
            // enabling the global loading
            setSectionLoadingVisible(true)

            // deleting user from the api
            deleteUser(props.currentUser.userId, userId).then(res => {
                // disabling the global loading
                setSectionLoadingVisible(false)

                const deletedUser = res.data
                // if user delete succesfully
                if (deletedUser.success) {
                    // updating user state after deleting a user.
                    const filtersUsersList = users.filter(item => item.login_id !== userId)

                    // settings updated users
                    setUsers(filtersUsersList)

                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.success(USER_DELETED_SUCCESSFULLY, {
                        autoClose: 2500,
                        onClose: () => {
                        }
                    })
                }

                // if user delete succesfully
                if (deletedUser.error) {
                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.error(NO_USER_FOUND_DELETING_USER, {
                        autoClose: 2500,
                        onClose: () => {
                        }
                    })
                }
            }).catch(err => {
                // disabling the global loading
                setSectionLoadingVisible(false)

                console.log('err ', err.message)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(ERROR_WHILE_DELETING_USER, {
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

        // getting admin users data
        getUsers(props.currentUser.userId, URLParams).then(res => {
            // disabling section loading
            setSectionLoadingVisible(false)

            const resData = res.data

            // if request succesfull
            if (resData && resData.success) {
                // setting pagination links
                setPaginationLinks(resData.links)

                // settings users
                setUsers(resData.data)
            }

            // if request is not succesfull
            if (resData && resData.error) {
                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(ERROR_WHILE_SEARCHING_USERS, {
                    autoClose: 3000
                })
            }
        }).catch(err => {
            console.log('err ', err.message)

            // dismissing all the previous toasts first
            toast.dismiss();

            // showing the error message
            toast.error(ERROR_WHILE_SEARCHING_USERS, {
                autoClose: 3000,
                onClose: () => {
                    // disabling section loading
                    setSectionLoadingVisible(false)
                }
            })
        })
    }, 500)

    return (
        <section id="app-users" className="st-def-mar-TB">
            <Container fluid className="st-container">
                <div className="app-users">
                    {/* HEADING WRAPPER */}
                    <div className="app-header-wrapper d-flex mb-2">
                        {/* heading */}
                        <p className="app-heading text-capitalize">users</p>
                    </div>

                    {/* CONTENT WRAPPER */}
                    <div className="app-content-container">
                        {/* app card */}
                        <div className="app-card">
                            <div className="app-card-content bg-white border st-border-light st-default-rounded-block mb-3">
                                {/* top bar */}
                                <div className="acc_top-bar border-bottom st-border-light">
                                    <UserTableTopBar

                                        column__User={column__User}
                                        column__Email={column__Email}
                                        column__Type={column__Type}
                                        column__TwoFactors={column__TwoFactors}
                                        column__LastActive={column__LastActive}
                                        column__Status={column__Status}

                                        setColumn__User={bool => setColumn__User(bool)}
                                        setColumn__Email={bool => setColumn__Email(bool)}
                                        setColumn__Type={bool => setColumn__Type(bool)}
                                        setColumn__TwoFactors={bool => setColumn__TwoFactors(bool)}
                                        setColumn__LastActive={bool => setColumn__LastActive(bool)}
                                        setColumn__Status={bool => setColumn__Status(bool)}

                                        handleSearchChange={handleSearchChange}
                                    />
                                </div>

                                {/* table */}
                                <div className="st-listing-table users-table">
                                    <UserTable
                                        allCheckboxSelected={allCheckboxSelected}
                                        handleSelectAllChange={ev => handleSelectAllChange(ev)}

                                        column__User={column__User}
                                        column__Email={column__Email}
                                        column__Type={column__Type}
                                        column__TwoFactors={column__TwoFactors}
                                        column__LastActive={column__LastActive}
                                        column__Status={column__Status}

                                        loadingCount={loadingCount}
                                        loading={loading}

                                        users={users}

                                        handleDelete={(ev, userId) => handleDelete(ev, userId)}
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
                                    routeName={"/settings/users"}
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

export default connect(getDataFromStore, null)(Users)