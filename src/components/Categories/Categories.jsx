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

// common healpers
import { debounce } from 'utlis/helpers/Common/CommonHelperFunctions'

// actions
import { addCategories } from 'redux/actions/actionCatalog'

// custom hooks
import useQuery from 'utlis/CustomHooks/useQueryHook'

// app messages
import {
    UNKNOWN_ERROR_OCCURED,
    ERROR_WHILE__NAME,
    ERROR_WHILE_FETCHING_CATEGORIES,
    ERROR_WHILE_DELETING_CATEGORY,
    CATEGORY_DELETED_SUCCESSFULLY,
    CONFIRMATION_BEFORE_DELETING_CATEGORY
} from 'utlis/AppMessages/AppMessages'

function Categories(props) {
    // const
    const loadingCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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

    const [searchQuery, setSearchQuery] = useState("")

    let query = useQuery();

    // useEffect: getting category data
    useEffect(() => {
        let page = query.get('page')
        let keyword = query.get('keyword')

        // generating url parameters
        let URLParams = `${(keyword) ? "keyword=" + keyword + "&" : ""}${page ? "page=" + page : ""}`

        // enabling loading types based on the data present or not
        if (categories && categories.length) {
            // enabling section loading
            setSectionLoadingVisible(true)
        } else {
            // enabling loading
            setLoading(true)
        }

        // getting data
        getCategories(props.currentUser.userToken, URLParams).then(res => {
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

                // settings categories
                setCategories(resData.data)

                // updating global state for categories
                // props.addCategoriesToGlobalState(URLParams, resData.data)
            }

            // if request is not succesfull
            if (resData && resData.error) {
                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(ERROR_WHILE_FETCHING_CATEGORIES, {
                    autoClose: 3000
                })
            }
        }).catch(err => {
            console.log(`${ERROR_WHILE__NAME} getCategories `, err.message)

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
    const handleDelete = (ev, catId) => {
        ev.preventDefault()
        var confirmation = window.confirm(CONFIRMATION_BEFORE_DELETING_CATEGORY)

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
                    toast.success(CATEGORY_DELETED_SUCCESSFULLY, {
                        autoClose: 2500
                    })
                }

                // if some error while deleting
                if (deletedData.error) {
                    console.log(ERROR_WHILE_DELETING_CATEGORY, res)
                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.error(ERROR_WHILE_DELETING_CATEGORY, {
                        autoClose: 2500,
                    })
                }

            }).catch(err => {
                console.log(`${ERROR_WHILE__NAME} deleteCategory `, err.message)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(UNKNOWN_ERROR_OCCURED, {
                    autoClose: 2500,
                    onClose: () => {
                        // disabling the section loading
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
            props.history.push(`/catalog/categories?keyword=${searchQueryValue}&page=1`)
        }

        // if serch query does not have length
        if (!searchQueryValue) {
            // setting search query data
            setSearchQuery("")

            // redirecting to products with search data
            props.history.push(`/catalog/categories?page=1`)
        }
    }, 500)

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
                                        column__CategoryName={column__CategoryName}
                                        column__CategoryImg={column__CategoryImg}
                                        column__CategoryParentCategory={column__CategoryParentCategory}
                                        column__CategoryStatus={column__CategoryStatus}

                                        setColumn__CategoryName={setColumn__CategoryName}
                                        setColumn__CategoryImg={setColumn__CategoryImg}
                                        setColumn__CategoryParentCategory={setColumn__CategoryParentCategory}
                                        setColumn__CategoryStatus={setColumn__CategoryStatus}

                                        handleSearchChange={handleSearchChange}
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
                                    searchQuery={searchQuery}
                                    routeName={"/catalog/categories"}
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