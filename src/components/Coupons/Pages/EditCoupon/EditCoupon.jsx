import React, { useState, useRef, useEffect } from 'react'

// redux
import { connect } from 'react-redux'

// bootstrap
import {
    Container,
    Spinner
} from 'react-bootstrap'

// icons : feather
import FeatherIcon from 'feather-icons-react';

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
import CouponsFormContentView from './Includes/CouponsFormContentView'

// APIs
import { getCouponDetails, cancelGetCouponDetailsApi, editCoupon } from 'utlis/Apis/Coupons_API'

// actions
import { setGlobalLoading } from 'redux/actions/actionCommon'

// app messages
import {
    UNKNOWN_ERROR_OCCURED,
    ERROR_WHILE__NAME,
    COUPON_UPDATED_SUCCESSFULLY,
    ERROR_WHILE_UPDATING_COUPON,
    ERROR_WHILE_GETTING_COUPON_DETAILS
} from 'utlis/AppMessages/AppMessages'

function EditCoupon(props) {
    // refs
    const submitButtonRef = useRef(null)

    // states
    const [editButtonDisable, setEditButtonDisable] = useState(false)
    const [editButtonLoading, setEditButtonLoading] = useState(false)

    const [couponId, setCouponId] = useState("")

    // initial form values
    const initialEditFormValues = {
        couponCode: "",
        couponDiscountType: "",
        couponDiscountPercent: "",
        couponDiscountValue: "",
        couponExpiryDate: "",
        couponMinOrderAmount: "",
        couponStatus: "",
        couponFreeShiping: false,
        couponSingleUse: false,
        couponSingleUsePerUser: false,
    }

    // handle form validations
    const editFormValidationSchema = Yup.object({
        couponCode: Yup.string().required('This field is required'),
        couponDiscountType: Yup.string().required('This field is required'),
        couponDiscountPercent: Yup.string().when('couponDiscountType', {
            is: "percent",
            then: Yup.string().required('This field is required')
        }),
        couponDiscountValue: Yup.string().when('couponDiscountType', {
            is: "value",
            then: Yup.string().required('This field is required')
        }),
        couponExpiryDate: Yup.string().required('This field is required'),
        couponMinOrderAmount: Yup.string(),
        couponFreeShiping: Yup.string(),
        couponStatus: Yup.string(),
        couponSingleUse: Yup.bool(),
        couponSingleUsePerUser: Yup.bool(),
    })

    // getting coupon id from the url
    useEffect(() => {
        const idFromUrl = props.match.params;
        // setting user id from the url
        if (idFromUrl) {
            setCouponId(idFromUrl.id)
        }
    }, [])

    // getting coupon details from the location state 
    useEffect(() => {
        const locState = props.location.state ?? props.location.state
        // if state with the coupon data exists in the location state
        if (locState) {
            const couponData = locState.couponDetails
            // setting the form fields
            formik.setFieldValue("couponCode", couponData?.coupon_code ?? "")
            formik.setFieldValue("couponDiscountType", couponData?.discount_type ?? "")
            formik.setFieldValue("couponDiscountPercent", couponData?.discount_percent ?? "")
            formik.setFieldValue("couponDiscountValue", couponData?.discount_value ?? "")
            formik.setFieldValue("couponExpiryDate", couponData?.expiry_date ?? "")
            formik.setFieldValue("couponMinOrderAmount", couponData?.minimum_order_amount ?? "")
            formik.setFieldValue("couponStatus", couponData?.is_active ?? "")
            formik.setFieldValue("couponFreeShiping", couponData?.free_shipping ? true : false ?? false)
            formik.setFieldValue("couponSingleUse", couponData?.single_use ? true : false ?? false)
            formik.setFieldValue("couponSingleUsePerUser", couponData?.single_use_per_user ? true : false ?? false)
        }
    }, [props])

    // getting coupon details from the database with the id from the url
    useEffect(() => {
        const locState = props.location.state ?? props.location.state
        // if state with the coupon data does not exist in the location state

        if (!locState) {
            // enabling the global loading
            props.setGlobalLoading(true)

            // getting the coupon from the database
            const couponId = props.match.params.id ?? ""

            // getting coupon details
            getCouponDetails(props.currentUser.userToken, couponId).then(res => {
                console.log("res ", res)
                const couponData = res.data
                // disabling the global loading
                props.setGlobalLoading(false)

                // if request is success
                if (couponData.success) {
                    // setting the form fields
                    formik.setFieldValue("couponCode", couponData?.data?.coupon_code ?? "")
                    formik.setFieldValue("couponDiscountType", couponData?.data?.discount_type ?? "")
                    formik.setFieldValue("couponDiscountPercent", couponData?.data?.discount_percent ?? "")
                    formik.setFieldValue("couponDiscountValue", couponData?.data?.discount_value ?? "")
                    formik.setFieldValue("couponExpiryDate", couponData?.data?.expiry_date ?? "")
                    formik.setFieldValue("couponMinOrderAmount", couponData?.data?.minimum_order_amount ?? "")
                    formik.setFieldValue("couponStatus", couponData?.data?.is_active ?? "")
                    formik.setFieldValue("couponFreeShiping", couponData?.data?.free_shipping ? true : false ?? false)
                    formik.setFieldValue("couponSingleUse", couponData?.data?.single_use ? true : false ?? false)
                    formik.setFieldValue("couponSingleUsePerUser", couponData?.data?.single_use_per_user ? true : false ?? false)
                }

                // // if request is not succeed
                if (couponData.error) {
                    console.log(ERROR_WHILE_GETTING_COUPON_DETAILS, res)
                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.error(ERROR_WHILE_GETTING_COUPON_DETAILS, {
                        autoClose: 3000,
                    })
                }
            }).catch(err => {
                console.log(`${ERROR_WHILE__NAME} getCouponDetails `, err.message)

                // disabling the global loading
                props.setGlobalLoading(false)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(UNKNOWN_ERROR_OCCURED, {
                    autoClose: 2500,
                })
            })

            return () => {
                // canceling get coupon api when user leaves the component
                cancelGetCouponDetailsApi()
            }
        }
    }, [])

    // handle form submmision
    const onEditFormSubmit = values => {
        if (values) {
            // enabling global loading
            setGlobalLoading(true)

            // enabling the button and enabling loading
            setEditButtonDisable(true)
            setEditButtonLoading(true)

            // saving the data in the database
            const dataToBeSaved = {
                coupon_id: couponId,
                coupon_code: values.couponCode,
                discount_percent: values.couponDiscountPercent,
                discount_value: values.couponDiscountValue,
                expiry_date: values.couponExpiryDate,
                minimum_order_amount: values.couponMinOrderAmount,
                is_active: values.couponStatus,
                free_shipping: values.couponFreeShiping,
                single_use: values.couponSingleUse,
                single_use_per_user: values.couponSingleUsePerUser,
            }

            // saving data
            editCoupon(props.currentUser.userToken, dataToBeSaved).then(res => {
                // disabling global loading
                setGlobalLoading(false)

                // enabling the button and disabling loading
                setEditButtonDisable(false)
                setEditButtonLoading(false)

                const addingData = res.data

                // if request is success
                if (addingData.success) {
                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.success(COUPON_UPDATED_SUCCESSFULLY, {
                        autoClose: 2500,
                        onClose: () => {
                            // enabling the edit button
                            setEditButtonDisable(false)
                        }
                    })
                }

                // if request is not succeed
                if (addingData.error) {
                    console.log(ERROR_WHILE_UPDATING_COUPON, res)

                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.error(ERROR_WHILE_UPDATING_COUPON, {
                        autoClose: 3000,
                        onClose: () => {
                            // enabling the button and disabling loading
                            setEditButtonDisable(false)
                        }
                    })
                }
            }).catch(err => {
                console.log(`${ERROR_WHILE__NAME} editCoupon `, err.message)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(UNKNOWN_ERROR_OCCURED, {
                    autoClose: 2500,
                    onClose: () => {
                        // disabling global loading
                        setGlobalLoading(false)

                        // disbling the button and enabling loading
                        setEditButtonDisable(false)
                        setEditButtonLoading(false)
                    }
                })
            })
        }
    }

    // formik hook
    const formik = useFormik({
        initialValues: initialEditFormValues,
        validationSchema: editFormValidationSchema,
        onSubmit: onEditFormSubmit,
        enableReinitialize: true
    })

    // handle button submission
    const handleFormSubmission = (ev) => {
        ev.preventDefault()

        // triggering click on submit button
        submitButtonRef.current.click()
    }

    // handle expiry date change
    const handleDateChange = value => {
        if (value) {
            console.log("value ", value)
            // const selectedDate = new Date(value)
            // console.log("selectedDate ", selectedDate)
            // let date = selectedDate.getDate()
            // let month = selectedDate.getMonth() + 1
            // let year = selectedDate.getFullYear()

            // let finalDate = `${year}-${month}-${date}`

            // setting the expiry date value in the hidden input
            formik.setFieldValue("couponExpiryDate", value)
        }
    }

    return (
        <section id="app-coupons__edit-details" className="st-def-mar-TB">
            <Container fluid className="st-container">
                <div className="app-coupons__edit-details">
                    {/* BACK BUTTON WRAPPER */}
                    <div className="back-button-wrapper mb-2">
                        <Link to="/catalog/coupons" className="text-decoration-none st-text-primary d-inline-flex align-items-center cursor-pointer st-fs-15">
                            <FeatherIcon
                                icon="arrow-left"
                                size="14"
                                className="icon me-1" />
                            <span>Back to coupons</span>
                        </Link>
                    </div>

                    {/* HEADING WRAPPER */}
                    <div className="app-header-wrapper mb-3">
                        {/* heading */}
                        <p className="app-heading text-capitalize">Edit Coupon</p>
                        <p className="app-desc">
                            Edit a Coupon.
                        </p>
                    </div>

                    {/* CONTENT WRAPPER */}
                    <form
                        onSubmit={formik.handleSubmit}
                        noValidate
                        autoComplete="off">
                        <div className="app-content-container">
                            <CouponsFormContentView
                                formik={formik}
                                parentProps={props}
                                handleDateChange={handleDateChange}
                            />

                            {/* app card : bottom-bar */}
                            <div className={`app-card action-btns ${props.sideBarVisibility ? "" : "sidebar-expanded"}`}>
                                <div className="app-card-content bg-white border-top st-border-light d-flex align-items-center justify-content-end">
                                    <Link to="/catalog/coupons" className="st-btn st-btn-link no-min-width d-flex align-items-center justify-content-center me-1">
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        className={`st-btn st-btn-primary d-flex align-items-center justify-content-center ${(editButtonDisable || Object.keys(formik.errors).length) ? "disabled" : ""}`}
                                        disabled={editButtonDisable || Object.keys(formik.errors).length}
                                        onClick={handleFormSubmission}>
                                        {
                                            editButtonLoading ? (
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
        currentUser: state.auth.currentUser,
        sideBarVisibility: state.common.sideBarVisibility
    };
}

const dispatchActionsToProps = dispatch => {
    return {
        setGlobalLoading: bool => dispatch(setGlobalLoading(bool)),
    }
}

export default connect(getDataFromStore, dispatchActionsToProps)(EditCoupon)