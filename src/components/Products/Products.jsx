import React, { useState, useEffect } from 'react'

// redux
import { connect } from 'react-redux'

// bootstrap
import {
    Container
} from 'react-bootstrap'

// products styles
import "./styles/products-styles.scss"

// products table
import ProductsTableTopBar from './includes/ProductsTable/ProductsTableTopBar'
import ProductsTable from './includes/ProductsTable/ProductsTable'

// react toastify
import { toast } from 'react-toastify';

// APIs
import { getProducts, deleteProduct } from 'utlis/Apis/Products_API'

// section loading
import SectionLoading from 'utlis/helpers/SectionLoading/SectionLoading'

// pagination
import Pagination from 'components/CommonComponents/Pagination'

// common healpers
import { debounce } from 'utlis/helpers/Common/CommonHelperFunctions'

// custom hooks
import useQuery from 'utlis/CustomHooks/useQueryHook'

// app messages
import {
    UNKNOWN_ERROR_OCCURED,
    ERROR_WHILE__NAME,
    ERROR_WHILE_FETCHING_PRODUCTS,
    ERROR_WHILE_DELETING_PRODUCTS,
    CONFIRMATION_BEFORE_DELETING_PRODUCT,
    PRODUCT_DELETED_SUCCESSFULLY,
} from 'utlis/AppMessages/AppMessages'

function Products(props) {
    // consts
    const loadingCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    // states
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const [allCheckboxSelected, setAllCheckboxesSelected] = useState(false)
    const [paginationLinks, setPaginationLinks] = useState([])

    const [column__ProductName, setColumn__ProductName] = useState(true)
    const [column__ProductImg, setColumn__ProductImg] = useState(true)
    const [column__ProductSKU, setColumn__ProductSKU] = useState(true)
    const [column__ProductStatus, setColumn__ProductStatus] = useState(true)

    const [sectionLoadingVisible, setSectionLoadingVisible] = useState(false)

    const [searchQuery, setSearchQuery] = useState("")

    let query = useQuery();

    // useEffect: getting products data
    useEffect(() => {
        let page = query.get('page')
        let keyword = query.get('keyword')

        // generating url parameters
        let URLParams = `${(keyword) ? "keyword=" + keyword + "&" : ""}${page ? "page=" + page : ""}`

        // enabling loading types based on the data present or not
        if (products && products.length) {
            // enabling section loading
            setSectionLoadingVisible(true)
        } else {
            // enabling loading
            setLoading(true)
        }

        // getting data
        getProducts(props.currentUser.userToken, URLParams).then(res => {
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

                // settings products
                setProducts(resData.data)
            }

            // if request is not succesfull
            if (resData && resData.error) {
                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(ERROR_WHILE_FETCHING_PRODUCTS, {
                    autoClose: 3000,
                    onClose: () => {
                        // disabling loading
                        setLoading(false)
                    }
                })
            }
        }).catch(err => {
            console.log(`${ERROR_WHILE__NAME} getProducts `, err.message)

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
    const handleDelete = (ev, prodId) => {
        ev.preventDefault()
        var confirmation = window.confirm(CONFIRMATION_BEFORE_DELETING_PRODUCT)

        if (confirmation) {
            // enabling the section loading
            setSectionLoadingVisible(true)

            // deleting data from the api
            deleteProduct(props.currentUser.userToken, prodId).then(res => {
                // disabling the section loading
                setSectionLoadingVisible(false)

                const deletedData = res.data
                // if delete succesfully
                if (deletedData.success) {
                    // updating products state after deleting an products.
                    const filteredList = products.filter(item => item.product_id !== prodId)

                    // settings updated products
                    setProducts(filteredList)

                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.success(PRODUCT_DELETED_SUCCESSFULLY, {
                        autoClose: 2500,
                    })
                }

                // if some error while deleting
                if (deletedData.error) {
                    console.log(ERROR_WHILE_DELETING_PRODUCTS, res)
                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.error(ERROR_WHILE_DELETING_PRODUCTS, {
                        autoClose: 2500,
                    })
                }
            }).catch(err => {
                console.log(`${ERROR_WHILE__NAME} deleteProduct `, err.message)

                // disabling the section loading
                setSectionLoadingVisible(false)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(UNKNOWN_ERROR_OCCURED, {
                    autoClose: 2500
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
            props.history.push(`/catalog/products?keyword=${searchQueryValue}&page=1`)
        }

        // if serch query does not have length
        if (!searchQueryValue) {
            // setting search query data
            setSearchQuery("")

            // redirecting to products with search data
            props.history.push(`/catalog/products?page=1`)
        }
    }, 500)

    return (
        <section id="app-products" className="st-def-mar-TB">
            <Container fluid className="st-container">
                <div className="app-products">
                    {/* HEADING WRAPPER */}
                    <div className="app-header-wrapper d-flex mb-2">
                        {/* heading */}
                        <p className="app-heading text-capitalize">Products</p>
                    </div>

                    {/* CONTENT WRAPPER */}
                    <div className="app-content-container">
                        {/* app card */}
                        <div className="app-card">
                            <div className="app-card-content bg-white border st-border-light st-default-rounded-block mb-3">
                                {/* top bar */}
                                <div className="acc_top-bar border-bottom st-border-light">
                                    <ProductsTableTopBar
                                        column__ProductName={column__ProductName}
                                        column__ProductImg={column__ProductImg}
                                        column__ProductSKU={column__ProductSKU}
                                        column__ProductStatus={column__ProductStatus}

                                        setColumn__ProductName={setColumn__ProductName}
                                        setColumn__ProductImg={setColumn__ProductImg}
                                        setColumn__ProductSKU={setColumn__ProductSKU}
                                        setColumn__ProductStatus={setColumn__ProductStatus}

                                        handleSearchChange={handleSearchChange}
                                    />
                                </div>

                                {/* table */}
                                <div className="st-listing-table products-table">
                                    <ProductsTable
                                        allCheckboxSelected={allCheckboxSelected}
                                        handleSelectAllChange={ev => handleSelectAllChange(ev)}

                                        column__ProductName={column__ProductName}
                                        column__ProductImg={column__ProductImg}
                                        column__ProductSKU={column__ProductSKU}
                                        column__ProductStatus={column__ProductStatus}

                                        loadingCount={loadingCount}
                                        loading={loading}

                                        products={products}

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
                                    routeName={"/catalog/products"}
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
//         func: (data) => dispatch(func(data)),
//     }
// }

export default connect(getDataFromStore, null)(Products)