import React, { useState, useRef } from 'react'

// redux
import { connect } from 'react-redux'

// bootstrap
import {
    Container,
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
import CouponsFormContentView from './Includes/CouponsFormContentView'

// APIs
import { addCoupon } from 'utlis/Apis/Coupons_API'

// actions
import { setGlobalLoading } from 'redux/actions/actionCommon'

function CreateCoupon(props) {
    // error and success messages
    const COUPON_ADDED_SUCCESSFULLY = "Coupon created successfully."
    const ERROR_WHILE_CREATING_COUPON = "Error occured!! please check if all the required fields are filled correctly."
    const UNKNOWN_ERROR = "Unknown error occured. please try again."

    // refs
    const submitButtonRef = useRef(null)

    // states
    const [createButtonDisable, setCreateButtonDisable] = useState(false)
    const [createButtonLoading, setCreateButtonLoading] = useState(false)

    // initial form values
    const initialCreateFormValues = {
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
    const createFormValidationSchema = Yup.object({
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

            console.log("coupons data to be saved ", dataToBeSaved)

            // saving data
            addCoupon(props.currentUser.userToken, dataToBeSaved).then(res => {
                // disabling global loading
                setGlobalLoading(false)

                const addingData = res.data

                // if request is success
                if (addingData.success) {
                    // disabling the button loading
                    setCreateButtonLoading(false)

                    // scrolling the window to top
                    window.scrollTo(0, 0)

                    // resetting the form
                    formik.resetForm()

                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.success(COUPON_ADDED_SUCCESSFULLY, {
                        autoClose: 2000,
                        onClose: () => {
                            // redirecting to coupons
                            props.history.push('/catalog/coupons', {
                                shouldReload: true
                            })
                        }
                    })
                }

                // if request is not succeed
                if (addingData.error) {
                    console.log(ERROR_WHILE_CREATING_COUPON, res)

                    // enabling the button and disabling loading
                    setCreateButtonDisable(false)
                    setCreateButtonLoading(false)

                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.error(ERROR_WHILE_CREATING_COUPON, {
                        autoClose: 3000,
                        onClose: () => {
                            // enabling the button and disabling loading
                            setCreateButtonDisable(false)
                        }
                    })
                }
            }).catch(err => {
                console.log('error while create category api ', err.message)

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
        <section id="app-coupons__create-details" className="st-def-mar-TB">
            <Container fluid className="st-container">
                <div className="app-coupons__create-details">
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
                                        className={`st-btn st-btn-primary d-flex align-items-center justify-content-center ${(createButtonDisable || Object.keys(formik.errors).length) ? "disabled" : ""}`}
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
        currentUser: state.auth.currentUser,
        sideBarVisibility: state.common.sideBarVisibility
    };
}

const dispatchActionsToProps = dispatch => {
    return {
        setGlobalLoading: bool => dispatch(setGlobalLoading(bool)),
    }
}

export default connect(getDataFromStore, dispatchActionsToProps)(CreateCoupon)