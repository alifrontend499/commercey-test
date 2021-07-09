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

// custom hooks
import useQuery from 'utlis/CustomHooks/useQueryHook'

// messages
import {
    UNKNOWN_ERROR_OCCURED,
    ERROR_WHILE__NAME,
    ERROR_WHILE_FETCHING_USERS,
    ERROR_WHILE_DELETING_USER,
    CONFIRMATION_BEFORE_DELETING_USER,
    USER_DELETED_SUCCESSFULLY,
} from 'utlis/AppMessages/AppMessages'

function Users(props) {
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

    let query = useQuery();

    // useEffect: getting users data
    useEffect(() => {
        let page = query.get('page')
        let keyword = query.get('keyword')

        // generating url parameters
        let URLParams = `${(keyword) ? "keyword=" + keyword + "&" : ""}${page ? "page=" + page : ""}`

        // enabling loading types based on the data present or not
        if (users && users.length) {
            // enabling section loading
            setSectionLoadingVisible(true)
        } else {
            // enabling loading
            setLoading(true)
        }

        // getting admin users data
        getUsers(props.currentUser.userId, URLParams).then(res => {
            // disabling section loading & loading
            setSectionLoadingVisible(false)
            setLoading(false)

            const resData = res.data

            // scroll the page to the top
            window.scrollTo(0, 0)

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
                toast.error(ERROR_WHILE_FETCHING_USERS, {
                    autoClose: 3000
                })
            }
        }).catch(err => {
            console.log(`${ERROR_WHILE__NAME} getUsers `, err.message)

            // dismissing all the previous toasts first
            toast.dismiss();

            // showing the error message
            toast.error(UNKNOWN_ERROR_OCCURED, {
                autoClose: 2500,
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

        var confirmation = window.confirm(CONFIRMATION_BEFORE_DELETING_USER)
        // if user confirms action
        if (confirmation) {
            // enabling the global loading
            setSectionLoadingVisible(true)

            // deleting user from the api
            deleteUser(props.currentUser.userId, userId).then(res => {
                // disabling the global loading
                setSectionLoadingVisible(false)

                const deletedData = res.data
                // if user delete succesfully
                if (deletedData.success) {
                    // updating user state after deleting a user.
                    const filtersUsersList = users.filter(item => item.login_id !== userId)

                    // settings updated users
                    setUsers(filtersUsersList)

                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.success(USER_DELETED_SUCCESSFULLY, {
                        autoClose: 2500
                    })
                }

                // if user delete succesfully
                if (deletedData.error) {
                    console.log(ERROR_WHILE_DELETING_USER, res)
                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.error(ERROR_WHILE_DELETING_USER, {
                        autoClose: 2500,
                        onClose: () => {
                        }
                    })
                }
            }).catch(err => {
                console.log(`${ERROR_WHILE__NAME} deleteUser `, err.message)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(UNKNOWN_ERROR_OCCURED, {
                    autoClose: 2500,
                    onClose: () => {
                        // disabling the global loading
                        setSectionLoadingVisible(false)
                    }
                })
            })
        }
    }

    // searching
    const handleSearchChange = debounce(ev => {
        let searchQueryValue = ev.target.value

        // enabling section loading
        setSectionLoadingVisible(true)

        // if serch query has length
        if (searchQueryValue && searchQueryValue.length) {
            // setting search query data
            setSearchQuery(searchQueryValue)

            // redirecting to products with search data
            props.history.push(`/settings/users?keyword=${searchQueryValue}&page=1`)
        }

        // if serch query does not have length
        if (!searchQueryValue) {
            // setting search query data
            setSearchQuery("")

            // redirecting to products with search data
            props.history.push(`/settings/users?page=1`)
        }
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
                                    searchQuery={searchQuery}
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