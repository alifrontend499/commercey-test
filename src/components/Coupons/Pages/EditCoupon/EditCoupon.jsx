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
import CouponsFormView from './Includes/CouponsFormView'

// APIs
import { addBrand } from 'utlis/Apis/Brands_API'

// actions
import { setGlobalLoading } from 'redux/actions/actionCommon'

function EditCoupon(props) {
    // error and success messages
    const BRAND_ADDED_SUCCESSFULLY = "Brand edited successfully."
    const ERROR_WHILE_CREATING_BRAND = "Error occured!! please check if all the required fields are filled correctly."
    const UNKNOWN_ERROR = "Unknown error occured. please try again."

    // refs
    const submitButtonRef = useRef(null)

    // states
    const [editButtonDisable, setEditButtonDisable] = useState(false)
    const [editButtonLoading, setEditButtonLoading] = useState(false)

    const [couponCode, setCouponCode] = useState("")
    const [couponFor, setCouponFor] = useState("")
    const [couponDiscountPercent, setCouponDiscountPercent] = useState("")
    const [couponExpiryDate, setCouponExpiryDate] = useState("")
    const [couponMinOrderAmount, setCouponMinOrderAmount] = useState("")
    const [couponFreeShiping, setCouponFreeShiping] = useState(false)
    const [couponStatus, setCouponStatus] = useState(false)
    const [couponSingleUse, setCouponSingleUse] = useState(false)
    const [couponSingleUsePerUser, setCouponSingleUsePerUser] = useState(false)

    // initial form values
    const initialEditFormValues = {
        couponCode,
        couponFor,
        couponDiscountPercent,
        couponExpiryDate,
        couponMinOrderAmount,
        couponFreeShiping,
        couponStatus,
        couponSingleUse,
        couponSingleUsePerUser,
    }

    // handle form validations
    const editFormValidationSchema = Yup.object({
        couponCode: Yup.string().required('This field is required'),
        couponFor: Yup.string().required('This field is required'),
        couponDiscountPercent: Yup.string(),
        couponExpiryDate: Yup.string().required('This field is required'),
        couponMinOrderAmount: Yup.string(),
        couponFreeShiping: Yup.string(),
        couponStatus: Yup.bool(),
        couponSingleUse: Yup.bool(),
        couponSingleUsePerUser: Yup.bool(),
    })

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
                brand_name: values.brandName,
            }

            // saving data
            addBrand(props.currentUser.userToken, dataToBeSaved).then(res => {
                // disabling global loading
                setGlobalLoading(false)

                // disbling the button and enabling loading
                setEditButtonLoading(false)

                const addingData = res.data

                // if request is success
                if (addingData.success) {
                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.success(BRAND_ADDED_SUCCESSFULLY, {
                        autoClose: 2500,
                        onClose: () => {
                            // empty the fields
                            setCouponCode("")
                            setEditButtonDisable(false)
                        }
                    })
                }

                // if request is not succeed
                if (addingData.error) {
                    console.log(ERROR_WHILE_CREATING_BRAND, res)

                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.error(ERROR_WHILE_CREATING_BRAND, {
                        autoClose: 3000,
                        onClose: () => {
                            // enabling the button and disabling loading
                            setEditButtonDisable(false)
                        }
                    })
                }
            }).catch(err => {
                console.log('err while getBrandDetails api ', err.message)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(UNKNOWN_ERROR, {
                    autoClose: 3000,
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

    return (
        <section id="app-blogs__edit-details" className="st-def-mar-TB">
            <Container fluid className="st-container">
                <div className="app-blogs__edit-details">
                    {/* BACK BUTTON WRAPPER */}
                    <div className="back-button-wrapper mb-2">
                        <Link to="/catalog/coupons" className="text-decoration-none st-text-primary d-inline-flex align-items-center cursor-pointer st-fs-15">
                            <FeatherIcon
                                icon="arrow-left"
                                size="14"
                                className="icon me-1" />
                            <span>Back to Coupons</span>
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
                            <CouponsFormView
                                formik={formik}
                                parentProps={props}
                            />

                            {/* app card : bottom-bar */}
                            <div className="app-card action-btns">
                                <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-15 d-flex align-items-center justify-content-end">
                                    <Link to="/catalog/coupons" className="st-btn st-btn-link no-min-width d-flex align-items-center justify-content-center me-1">
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        className="st-btn st-btn-primary d-flex align-items-center justify-content-center"
                                        disabled={editButtonDisable}
                                        onClick={handleFormSubmission}>
                                        {
                                            editButtonLoading ? (
                                                <Spinner animation="border" size="sm" />
                                            ) : (
                                                <span>Edit Coupon</span>
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

export default connect(getDataFromStore, dispatchActionsToProps)(EditCoupon)