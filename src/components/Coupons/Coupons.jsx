import React, { useState, useEffect } from 'react'

// redux
import { connect } from 'react-redux'

// bootstrap
import {
    Container
} from 'react-bootstrap'

// coupons styles
import "./styles/coupons-styles.scss"

// coupons table
import CouponsTableTopBar from './includes/CouponsTable/CouponsTableTopBar'
import CouponsTable from './includes/CouponsTable/CouponsTable'

// react toastify
import { toast } from 'react-toastify';

// APIs
import { getCoupons, deleteCoupon } from 'utlis/Apis/Coupons_API'

// section loading
import SectionLoading from 'utlis/helpers/SectionLoading/SectionLoading'

// pagination
import Pagination from 'components/CommonComponents/Pagination'

// common healpers
import { debounce } from 'utlis/helpers/Common/CommonHelperFunctions'

// custom hooks
import useQuery from 'utlis/CustomHooks/useQueryHook'

function Coupons(props) {
    // messages
    const ERROR_WHILE_FETCHING_COUPONS = "Unable to load Coupons. please try again."
    const ERROR_WHILE_DELETING_COUPON = "No detail found"
    const COUPON_DELETED_SUCCESSFULLY = "Coupon deleted successfully."
    const UNKNOWN_ERROR = "Unknown error occured. please try again."

    // consts
    const loadingCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const editColumnsType = "dropdown"  // dropdown or modal

    // refs

    // states
    const [coupons, setCoupons] = useState([])
    const [loading, setLoading] = useState(false)

    const [allCheckboxSelected, setAllCheckboxesSelected] = useState(false)
    const [paginationLinks, setPaginationLinks] = useState([])

    const [column__CouponCode, setColumn__CouponCode] = useState(true)
    const [column__CouponFor, setColumn__CouponFor] = useState(true)
    const [column__CouponDiscountPercent, setColumn__CouponDiscountPercent] = useState(true)
    const [column__CouponDiscountValue, setColumn__CouponDiscountValue] = useState(true)
    const [column__CouponExpiryDate, setColumn__CouponExpiryDate] = useState(true)
    const [column__CouponFreeShipping, setColumn__CouponFreeShipping] = useState(true)
    const [column__CouponStatus, setColumn__CouponStatus] = useState(true)
    const [column__CouponSingleUse, setColumn__CouponSingleUse] = useState(true)
    const [column__CouponSingleUsePerUser, setColumn__CouponSingleUsePerUser] = useState(true)

    const [sectionLoadingVisible, setSectionLoadingVisible] = useState(false)

    const [searchQuery, setSearchQuery] = useState("")

    let query = useQuery();

    // useEffect: getting coupons data
    useEffect(() => {
        let page = query.get('page')
        let keyword = query.get('keyword')

        // generating url parameters
        let URLParams = `${(keyword) ? "keyword=" + keyword + "&" : ""}${page ? "page=" + page : ""}`

        // enabling loading types based on the data present or not
        if (coupons && coupons.length) {
            // enabling section loading
            setSectionLoadingVisible(true)
        } else {
            // enabling loading
            setLoading(true)
        }

        // getting data
        getCoupons(props.currentUser.userToken, URLParams).then(res => {
            // disabling section loading & loading
            setSectionLoadingVisible(false)
            setLoading(false)

            const resData = res.data

            console.log("resData from coupons ", resData)

            // scroll the page to the top
            window.scrollTo(0, 0)

            // if request succesfull
            if (resData && resData.success) {
                // setting pagination links
                setPaginationLinks(resData.links)

                // settings coupons
                setCoupons(resData.data)
            }

            // if request is not succesfull
            if (resData && resData.error) {
                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(ERROR_WHILE_FETCHING_COUPONS, {
                    autoClose: 3000,
                    onClose: () => {
                        // disabling loading
                        setLoading(false)
                    }
                })
            }
        }).catch(err => {
            console.log('err while getCoupons api ', err.message)

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
    const handleDelete = (ev, couponId) => {
        ev.preventDefault()
        var confirmation = window.confirm('Are you sure you want to delete this coupon?')

        if (confirmation) {
            // enabling the section loading
            setSectionLoadingVisible(true)

            // deleting data from the api
            deleteCoupon(props.currentUser.userToken, couponId).then(res => {
                // disabling the section loading
                setSectionLoadingVisible(false)

                const deletedData = res.data
                // if delete succesfully
                if (deletedData.success) {
                    // updating coupons state after deleting an coupons.
                    const filteredList = coupons.filter(item => item.coupon_id !== couponId)

                    // settings updated coupons
                    setCoupons(filteredList)

                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.success(COUPON_DELETED_SUCCESSFULLY, {
                        autoClose: 2500,
                        onClose: () => {
                        }
                    })
                }

                // if some error while deleting
                if (deletedData.error) {
                    console.log(ERROR_WHILE_DELETING_COUPON, res)
                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.error(ERROR_WHILE_DELETING_COUPON, {
                        autoClose: 2500,
                    })
                }

            }).catch(err => {
                console.log('err while getCoupons api ', err.message)

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
            props.history.push(`/catalog/coupons?keyword=${searchQueryValue}&page=1`)
        }

        // if serch query does not have length
        if (!searchQueryValue) {
            // setting search query data
            setSearchQuery("")

            // redirecting to products with search data
            props.history.push(`/catalog/coupons?page=1`)
        }
    }, 500)

    return (
        <section id="app-coupons" className="st-def-mar-TB">
            <Container fluid className="st-container">
                <div className="app-coupons">
                    {/* HEADING WRAPPER */}
                    <div className="app-header-wrapper d-flex mb-2">
                        {/* heading */}
                        <p className="app-heading text-capitalize">coupons</p>
                    </div>

                    {/* CONTENT WRAPPER */}
                    <div className="app-content-container">
                        {/* app card */}
                        <div className="app-card">
                            <div className="app-card-content bg-white border st-border-light st-default-rounded-block mb-3">
                                {/* top bar */}
                                <div className="acc_top-bar border-bottom st-border-light">
                                    <CouponsTableTopBar
                                        editColumnsType={editColumnsType}

                                        column__CouponCode={column__CouponCode}
                                        column__CouponFor={column__CouponFor}
                                        column__CouponDiscountPercent={column__CouponDiscountPercent}
                                        column__CouponDiscountValue={column__CouponDiscountValue}
                                        column__CouponExpiryDate={column__CouponExpiryDate}
                                        column__CouponFreeShipping={column__CouponFreeShipping}
                                        column__CouponStatus={column__CouponStatus}
                                        column__CouponSingleUse={column__CouponSingleUse}
                                        column__CouponSingleUsePerUser={column__CouponSingleUsePerUser}

                                        setColumn__CouponCode={setColumn__CouponCode}
                                        setColumn__CouponFor={setColumn__CouponFor}
                                        setColumn__CouponDiscountPercent={setColumn__CouponDiscountPercent}
                                        setColumn__CouponDiscountValue={setColumn__CouponDiscountValue}
                                        setColumn__CouponExpiryDate={setColumn__CouponExpiryDate}
                                        setColumn__CouponFreeShipping={setColumn__CouponFreeShipping}
                                        setColumn__CouponStatus={setColumn__CouponStatus}
                                        setColumn__CouponSingleUse={setColumn__CouponSingleUse}
                                        setColumn__CouponSingleUsePerUser={setColumn__CouponSingleUsePerUser}

                                        handleSearchChange={handleSearchChange}
                                    />
                                </div>

                                {/* table */}
                                <div className="st-listing-table coupons-table">
                                    <CouponsTable
                                        allCheckboxSelected={allCheckboxSelected}
                                        handleSelectAllChange={ev => handleSelectAllChange(ev)}

                                        column__CouponCode={column__CouponCode}
                                        column__CouponFor={column__CouponFor}
                                        column__CouponDiscountPercent={column__CouponDiscountPercent}
                                        column__CouponDiscountValue={column__CouponDiscountValue}
                                        column__CouponExpiryDate={column__CouponExpiryDate}
                                        column__CouponFreeShipping={column__CouponFreeShipping}
                                        column__CouponStatus={column__CouponStatus}
                                        column__CouponSingleUse={column__CouponSingleUse}
                                        column__CouponSingleUsePerUser={column__CouponSingleUsePerUser}

                                        loadingCount={loadingCount}
                                        loading={loading}

                                        coupons={coupons}

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
                                    routeName={"/catalog/coupons"}
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

export default connect(getDataFromStore, null)(Coupons)