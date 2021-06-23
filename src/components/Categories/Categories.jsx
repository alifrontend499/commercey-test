import React, { useState, useEffect } from 'react'

// redux
import { connect } from 'react-redux'

// bootstrap
import {
    Container
} from 'react-bootstrap'

// categories styles
import "./styles/categories-styles.scss"

// category table
import CategoriesTableTopBar from './includes/CategoriesTable/CategoriesTableTopBar'
import CategoriesTable from './includes/CategoriesTable/CategoriesTable'

// react toastify
import { toast } from 'react-toastify';

// APIs
import { getCategories, deleteCategory } from 'utlis/Apis/Categories_API'

// section loading
import SectionLoading from 'utlis/helpers/SectionLoading/SectionLoading'

// pagination
import Pagination from 'components/CommonComponents/Pagination'

// actions
import { addCategories } from 'redux/actions/actionCatalog'

function Categories(props) {
    // messages
    const ERROR_WHILE_FETCHING_CATEGORIES = "Unable to load Categories. please try again."
    const ERROR_WHILE_DELETING_CATEGORIES = "No detail found"
    const CATEGORIES_DELETED_SUCCESSFULLY = "Category template deleted successfully."
    const UNKNOWN_ERROR = "Unable to delete the category. please try again."

    // consts
    const loadingCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const editColumnsType = "dropdown"  // dropdown or modal

    // refs

    // states
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)

    const [allCheckboxSelected, setAllCheckboxesSelected] = useState(false)
    const [paginationLinks, setPaginationLinks] = useState([])

    const [column__CategoryName, setColumn__CategoryName] = useState(true)
    const [column__CategoryImg, setColumn__CategoryImg] = useState(true)
    const [column__CategoryParentCategory, setColumn__CategoryParentCategory] = useState(true)
    const [column__CategoryStatus, setColumn__CategoryStatus] = useState(true)

    const [sectionLoadingVisible, setSectionLoadingVisible] = useState(false)


    // useEffect: getting category data
    useEffect(() => {
        const serchQuery = props.location.search

        // if search query is present in the URL
        if (serchQuery && serchQuery.length) {
            // if categories available then enabling section loading else enabling loading
            if (categories && categories.length) {
                // enabling section loading
                setSectionLoadingVisible(true)
            } else {
                // enabling loading
                setLoading(true)
            }

            // updating the searchQueary
            const serchQueryUpdated = serchQuery.replace("?", "")

            // if search query is not present in the URL
            getCategories(props.currentUser.userToken, "show_disabled=1&" + serchQueryUpdated).then(res => {
                // disabling section loading & loading
                setSectionLoadingVisible(false)
                setLoading(false)

                const resData = res.data

                // if request succesfull
                if (resData && resData.success) {
                    // setting pagination links
                    setPaginationLinks(resData.links)

                    // settings categories
                    setCategories(resData.data)

                    // updating global state for categories
                    props.addCategoriesToGlobalState(serchQueryUpdated, resData.data)
                }

                // if request is not succesfull
                if (resData && resData.error) {
                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.error(ERROR_WHILE_FETCHING_CATEGORIES, {
                        autoClose: 3000,
                        onClose: () => {
                            // disabling loading
                            setLoading(false)
                        }
                    })
                }
            }).catch(err => {
                // console.log('err ', err)
                console.log('err ', err.message)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(ERROR_WHILE_FETCHING_CATEGORIES, {
                    autoClose: 3000,
                    onClose: () => {
                        // disabling section loading & loading
                        setSectionLoadingVisible(false)
                        setLoading(false)
                    }
                })
            })

        } else {
            // enabling loading
            setLoading(true)

            // if search query is not present in the URL
            getCategories(props.currentUser.userToken, "show_disabled=1").then(res => {
                // disabling loading
                setLoading(false)

                const resData = res.data

                // if request succesfull
                if (resData && resData.success) {
                    // setting pagination links
                    setPaginationLinks(resData.links)

                    // settings categories
                    setCategories(resData.data)
                }

                // if request is not succesfull
                if (resData && resData.error) {
                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.error(ERROR_WHILE_FETCHING_CATEGORIES, {
                        autoClose: 3000,
                        onClose: () => {
                            // disabling loading
                            setLoading(false)
                        }
                    })
                }
            }).catch(err => {
                // console.log('err ', err)
                console.log('err ', err.message)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(ERROR_WHILE_FETCHING_CATEGORIES, {
                    autoClose: 3000,
                    onClose: () => {
                        // disabling loading
                        setLoading(false)
                    }
                })
            })
        }
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

    const handleDelete = (ev, catId) => {
        ev.preventDefault()
        console.log('catId ', catId)
        var confirmation = window.confirm('Are you sure you want to delete this category?')

        if (confirmation) {
            // enabling the section loading
            setSectionLoadingVisible(true)

            // deleting data from the api
            deleteCategory(props.currentUser.userToken, catId).then(res => {
                // disabling the section loading
                setSectionLoadingVisible(false)

                const deletedData = res.data
                // if delete succesfully
                if (deletedData.success) {
                    // updating categories state after deleting an categories.
                    const filteredList = categories.filter(item => item.category_id !== catId)

                    // settings updated categories
                    setCategories(filteredList)

                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.success(CATEGORIES_DELETED_SUCCESSFULLY, {
                        autoClose: 2500,
                        onClose: () => {
                        }
                    })
                }

                // if some error while deleting
                if (deletedData.error) {
                    console.log(ERROR_WHILE_DELETING_CATEGORIES, res)
                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.error(ERROR_WHILE_DELETING_CATEGORIES, {
                        autoClose: 2500,
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

    return (
        <section id="app-categories" className="st-def-mar-TB">
            <Container fluid className="st-container">
                <div className="app-categories">
                    {/* HEADING WRAPPER */}
                    <div className="app-header-wrapper d-flex mb-2">
                        {/* heading */}
                        <p className="app-heading text-capitalize">Categories</p>
                    </div>

                    {/* CONTENT WRAPPER */}
                    <div className="app-content-container">
                        {/* app card */}
                        <div className="app-card">
                            <div className="app-card-content bg-white border st-border-light st-default-rounded-block mb-3">
                                {/* top bar */}
                                <div className="acc_top-bar border-bottom st-border-light">
                                    <CategoriesTableTopBar
                                        editColumnsType={editColumnsType}

                                        column__CategoryName={column__CategoryName}
                                        column__CategoryImg={column__CategoryImg}
                                        column__CategoryParentCategory={column__CategoryParentCategory}
                                        column__CategoryStatus={column__CategoryStatus}

                                        setColumn__CategoryName={setColumn__CategoryName}
                                        setColumn__CategoryImg={setColumn__CategoryImg}
                                        setColumn__CategoryParentCategory={setColumn__CategoryParentCategory}
                                        setColumn__CategoryStatus={setColumn__CategoryStatus}
                                    />
                                </div>

                                {/* table */}
                                <div className="st-listing-table categories-table">
                                    <CategoriesTable
                                        allCheckboxSelected={allCheckboxSelected}
                                        handleSelectAllChange={ev => handleSelectAllChange(ev)}

                                        column__CategoryName={column__CategoryName}
                                        column__CategoryImg={column__CategoryImg}
                                        column__CategoryParentCategory={column__CategoryParentCategory}
                                        column__CategoryStatus={column__CategoryStatus}

                                        loadingCount={loadingCount}
                                        loading={loading}

                                        categories={categories}

                                        handleDelete={(ev, id) => handleDelete(ev, id)}
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

const dispatchActionsToProps = dispatch => {
    return {
        addCategoriesToGlobalState: (page, data) => dispatch(addCategories(page, data)),
    }
}

export default connect(getDataFromStore, dispatchActionsToProps)(Categories)