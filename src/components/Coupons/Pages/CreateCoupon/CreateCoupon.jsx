import React, { useState, useRef, useEffect } from 'react'

// redux
import { connect } from 'react-redux'

// bootstrap
import {
    Container,
    Col,
    Spinner
} from 'react-bootstrap'

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

function CreateCoupon(props) {
    // error and success messages
    const BRAND_ADDED_SUCCESSFULLY = "Brand created successfully."
    const ERROR_WHILE_CREATING_BRAND = "Error occured!! please check if all the required fields are filled correctly."
    const UNKNOWN_ERROR = "Unknown error occured. please try again."

    // refs
    const submitButtonRef = useRef(null)

    // states
    const [createButtonDisable, setCreateButtonDisable] = useState(false)
    const [createButtonLoading, setCreateButtonLoading] = useState(false)

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
    const initialCreateFormValues = {
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
    const createFormValidationSchema = Yup.object({
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
    const onCreateFormSubmit = values => {
        if (values) {
            // enabling global loading
            setGlobalLoading(true)

            // enabling the button and enabling loading
            setCreateButtonDisable(true)
            setCreateButtonLoading(true)

            // saving the data in the database
            const dataToBeSaved = {
                brand_name: values.brandName,
            }

            // saving data
            addBrand(props.currentUser.userToken, dataToBeSaved).then(res => {
                // disabling global loading
                setGlobalLoading(false)

                // disbling the button and enabling loading
                setCreateButtonLoading(false)

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
                            setCreateButtonDisable(false)
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
                            setCreateButtonDisable(false)
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
                        setCreateButtonDisable(false)
                        setCreateButtonLoading(false)
                    }
                })
            })
        }
    }

    // formik hook
    const formik = useFormik({
        initialValues: initialCreateFormValues,
        validationSchema: createFormValidationSchema,
        onSubmit: onCreateFormSubmit,
        enableReinitialize: true
    })

    // handle button submission
    const handleFormSubmission = (ev) => {
        ev.preventDefault()

        // triggering click on submit button
        submitButtonRef.current.click()
    }

    return (
        <section id="app-blogs__create-details" className="st-def-mar-TB">
            <Container fluid className="st-container">
                <div className="app-blogs__create-details">
                    {/* HEADING WRAPPER */}
                    <div className="app-header-wrapper mb-3">
                        {/* heading */}
                        <p className="app-heading text-capitalize">Create Coupon</p>
                        <p className="app-desc">
                            Create a Coupon.
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
                                        disabled={createButtonDisable}
                                        onClick={handleFormSubmission}>
                                        {
                                            createButtonLoading ? (
                                                <Spinner animation="border" size="sm" />
                                            ) : (
                                                <span>Create Coupon</span>
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

export default connect(getDataFromStore, dispatchActionsToProps)(CreateCoupon)