import React, { useState, useEffect } from 'react'

// redux
import { connect } from 'react-redux'

// bootstrap
import {
    Container
} from 'react-bootstrap'

// brands styles
import "./styles/brands-styles.scss"

// brands table
import BrandsTableTopBar from './includes/BrandsTable/BrandsTableTopBar'
import BrandsTable from './includes/BrandsTable/BrandsTable'

// react toastify
import { toast } from 'react-toastify';

// APIs
import { getBrands, deleteBrand } from 'utlis/Apis/Brands_API'

// section loading
import SectionLoading from 'utlis/helpers/SectionLoading/SectionLoading'

// pagination
import Pagination from 'components/CommonComponents/Pagination'

// common healpers
import { debounce } from 'utlis/helpers/Common/CommonHelperFunctions'

// custom hooks
import useQuery from 'utlis/CustomHooks/useQueryHook'

function Brands(props) {
    // messages
    const ERROR_WHILE_FETCHING_BRANDS = "Unable to load Brands. please try again."
    const ERROR_WHILE_DELETING_BRAND = "No detail found"
    const BRAND_DELETED_SUCCESSFULLY = "Brand deleted successfully."
    const UNKNOWN_ERROR = "Unknown error occured. please try again."

    // consts
    const loadingCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const editColumnsType = "dropdown"  // dropdown or modal

    // refs

    // states
    const [brands, setBrands] = useState([])
    const [loading, setLoading] = useState(false)

    const [allCheckboxSelected, setAllCheckboxesSelected] = useState(false)
    const [paginationLinks, setPaginationLinks] = useState([])

    const [column__ManufacturerName, setColumn__ManufacturerName] = useState(true)
    const [column__ManufacturerUrl, setColumn__ManufacturerUrl] = useState(true)

    const [sectionLoadingVisible, setSectionLoadingVisible] = useState(false)

    const [searchQuery, setSearchQuery] = useState("")

    let query = useQuery();

    // useEffect: getting brands data
    useEffect(() => {
        let page = query.get('page')
        let keyword = query.get('keyword')

        // generating url parameters
        let URLParams = `${(keyword) ? "keyword=" + keyword + "&" : ""}${page ? "page=" + page : ""}`

        // enabling loading types based on the data present or not
        if (brands && brands.length) {
            // enabling section loading
            setSectionLoadingVisible(true)
        } else {
            // enabling loading
            setLoading(true)
        }

        // getting data
        getBrands(props.currentUser.userToken, URLParams).then(res => {
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

                // settings brands
                setBrands(resData.data)
            }

            // if request is not succesfull
            if (resData && resData.error) {
                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(ERROR_WHILE_FETCHING_BRANDS, {
                    autoClose: 3000,
                    onClose: () => {
                        // disabling loading
                        setLoading(false)
                    }
                })
            }
        }).catch(err => {
            console.log('err while getBrands api ', err.message)

            // dismissing all the previous toasts first
            toast.dismiss();

            // showing the error message
            toast.error(UNKNOWN_ERROR, {
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
    const handleDelete = (ev, brandId) => {
        ev.preventDefault()
        var confirmation = window.confirm('Are you sure you want to delete this brand?')

        if (confirmation) {
            // enabling the section loading
            setSectionLoadingVisible(true)

            // deleting data from the api
            deleteBrand(props.currentUser.userToken, brandId).then(res => {
                // disabling the section loading
                setSectionLoadingVisible(false)

                const deletedData = res.data
                // if delete succesfully
                if (deletedData.success) {
                    // updating brands state after deleting an brands.
                    const filteredList = brands.filter(item => item.manufacturer_id !== brandId)

                    // settings updated brands
                    setBrands(filteredList)

                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.success(BRAND_DELETED_SUCCESSFULLY, {
                        autoClose: 2500,
                        onClose: () => {
                        }
                    })
                }

                // if some error while deleting
                if (deletedData.error) {
                    console.log(ERROR_WHILE_DELETING_BRAND, res)
                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.error(ERROR_WHILE_DELETING_BRAND, {
                        autoClose: 2500,
                    })
                }

            }).catch(err => {
                console.log('err while getBrands api ', err.message)

                // disabling the section loading
                setSectionLoadingVisible(false)


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
        let searchQueryValue = ev.target.value

        // enabling section loading
        setSectionLoadingVisible(true)

        // if serch query has length
        if (searchQueryValue && searchQueryValue.length) {
            // setting search query data
            setSearchQuery(searchQueryValue)

            // redirecting to products with search data
            props.history.push(`/catalog/brands?keyword=${searchQueryValue}&page=1`)
        }

        // if serch query does not have length
        if (!searchQueryValue) {
            // setting search query data
            setSearchQuery("")

            // redirecting to products with search data
            props.history.push(`/catalog/brands?page=1`)
        }
    }, 500)

    return (
        <section id="app-brands" className="st-def-mar-TB">
            <Container fluid className="st-container">
                <div className="app-brands">
                    {/* HEADING WRAPPER */}
                    <div className="app-header-wrapper d-flex mb-2">
                        {/* heading */}
                        <p className="app-heading text-capitalize">Brands</p>
                    </div>

                    {/* CONTENT WRAPPER */}
                    <div className="app-content-container">
                        {/* app card */}
                        <div className="app-card">
                            <div className="app-card-content bg-white border st-border-light st-default-rounded-block mb-3">
                                {/* top bar */}
                                <div className="acc_top-bar border-bottom st-border-light">
                                    <BrandsTableTopBar
                                        editColumnsType={editColumnsType}

                                        column__ManufacturerName={column__ManufacturerName}
                                        column__ManufacturerUrl={column__ManufacturerUrl}

                                        setColumn__ManufacturerName={setColumn__ManufacturerName}
                                        setColumn__ManufacturerUrl={setColumn__ManufacturerUrl}

                                        handleSearchChange={handleSearchChange}
                                    />
                                </div>

                                {/* table */}
                                <div className="st-listing-table brands-table">
                                    <BrandsTable
                                        allCheckboxSelected={allCheckboxSelected}
                                        handleSelectAllChange={ev => handleSelectAllChange(ev)}

                                        column__ManufacturerName={column__ManufacturerName}
                                        column__ManufacturerUrl={column__ManufacturerUrl}

                                        loadingCount={loadingCount}
                                        loading={loading}

                                        brands={brands}

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
                                    routeName={"/catalog/brands"}
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
//         functionsData: (prop) => dispatch(functionsData(prop)),
//     }
// }

export default connect(getDataFromStore, null)(Brands)