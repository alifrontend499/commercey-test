import React, { useState, useRef, useEffect } from 'react'

// redux
import { connect } from 'react-redux'

// bootstrap
import {
    Container,
    Spinner
} from 'react-bootstrap'

// react router
import { Link } from 'react-router-dom'

// icons : feather
import FeatherIcon from 'feather-icons-react';

// formik
import {
    useFormik, //hook for functonal components
} from 'formik'

// yup
import * as Yup from 'yup'

// react toastify
import { toast } from 'react-toastify';

// includes
import BrandsFormContentView from './Includes/BrandsFormContentView'

// APIs
import { editBrand, getBrandDetails, cancelGetBrandDetailsApi } from 'utlis/Apis/Brands_API'

// actions
import { setGlobalLoading } from 'redux/actions/actionCommon'

// app messages
import {
    UNKNOWN_ERROR_OCCURED,
    ERROR_WHILE__NAME,
    BRAND_UPDATED_SUCCESSFULLY,
    ERROR_WHILE_UPDATING_BRAND,
    ERROR_WHILE_GETTING_BRAND_DETAILS,
} from 'utlis/AppMessages/AppMessages'

function EditBrand(props) {
    // refs
    const submitButtonRef = useRef(null)

    // states
    const [editButtonDisable, setEditButtonDisable] = useState(false)
    const [editButtonLoading, setEditButtonLoading] = useState(false)

    const [brandId, setBrandId] = useState([])

    // geting form values from the url
    useEffect(() => {
        const brandIdFromUrl = props.match.params;
        // setting user id from the url
        if (brandIdFromUrl) {
            setBrandId(brandIdFromUrl.id)
        }
    }, [props])

    // geting form values from the url
    useEffect(() => {
        const locState = props.location.state

        // if state with the brand exists in the location
        if (locState) {
            const brandsData = locState.brandsDetails

            // setting the form fields
            formik.setFieldValue("brandName", brandsData?.manufacturer_name?.toString() ?? "")
        }
    }, [props])

    // geting form values from the database if not found in the url
    useEffect(() => {
        const locState = props.location.state
        // if state with the user does not exists in the location
        if (!locState) {
            // enabling the global loading
            props.setGlobalLoading(true)
            // loading the user from the database
            const brandId = props.match.params.id ?? ""

            // getting single brand details
            getBrandDetails(props.currentUser.userToken, brandId).then(res => {
                const brandsData = res.data

                // disabling the global loading
                props.setGlobalLoading(false)

                // if request is success
                if (brandsData.success) {
                    // setting the form fields
                    formik.setFieldValue("brandName", brandsData?.manufacturer_name?.toString() ?? "")
                }
                // if request is not succeed
                if (brandsData.error) {
                    console.log(ERROR_WHILE_GETTING_BRAND_DETAILS, res)

                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.error(ERROR_WHILE_GETTING_BRAND_DETAILS, {
                        autoClose: 3000,
                    })
                }
            }).catch(err => {
                console.log(`${ERROR_WHILE__NAME} getBrandDetails `, err.message)
                
                // disabling the global loading
                props.setGlobalLoading(false)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(UNKNOWN_ERROR_OCCURED, {
                    autoClose: 2500
                })
            })

            return () => {
                // disabling the global loading
                props.setGlobalLoading(false)

                // canceling admin users api when user leaves the component
                cancelGetBrandDetailsApi()
            }
        }
    }, [])

    // initial form values
    const initialEditFormValues = {
        brandName: "",
    }

    // handle form validations
    const editFormValidationSchema = Yup.object({
        brandName: Yup.string().required('This field is required'),
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
                brand_id: brandId,
                brand_name: values.brandName,
            }

            // updating the details from the database
            editBrand(props.currentUser.userToken, dataToBeSaved).then(res => {
                // disabling global loading
                setGlobalLoading(false)

                // enabling the button and disabling loading
                setEditButtonDisable(false)
                setEditButtonLoading(false)

                const updatedData = res.data

                // if successfully created
                if (updatedData.success) {

                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing success message
                    toast.success(BRAND_UPDATED_SUCCESSFULLY, {
                        autoClose: 3000
                    })
                }

                // if some error
                if (updatedData.error) {
                    console.log(ERROR_WHILE_UPDATING_BRAND, res)
                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.error(ERROR_WHILE_UPDATING_BRAND, {
                        autoClose: 3000
                    })
                }
            }).catch(err => {
                console.log(`${ERROR_WHILE__NAME} editBrand `, err.message)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(UNKNOWN_ERROR_OCCURED, {
                    autoClose: 2500,
                    onClose: () => {
                        // disabling global loading
                        setGlobalLoading(false)

                        // enabling the button and disabling loading
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
        <section id="app-brands__edit-details" className="st-def-mar-TB">
            <Container fluid className="st-container">
                <div className="app-brands__edit-details">
                    {/* BACK BUTTON WRAPPER */}
                    <div className="back-button-wrapper mb-2">
                        <Link to="/catalog/brands" className="text-decoration-none st-text-primary d-inline-flex align-items-center cursor-pointer st-fs-15">
                            <FeatherIcon
                                icon="arrow-left"
                                size="14"
                                className="icon me-1" />
                            <span>Back to brands</span>
                        </Link>
                    </div>

                    {/* HEADING WRAPPER */}
                    <div className="app-header-wrapper mb-3">
                        {/* heading */}
                        <p className="app-heading text-capitalize">Edit Brands</p>
                        <p className="app-desc">
                            Edit a brand for your products.
                        </p>
                    </div>

                    {/* CONTENT WRAPPER */}
                    <form
                        onSubmit={formik.handleSubmit}
                        noValidate
                        autoComplete="off">
                        <div className="app-content-container">

                            <BrandsFormContentView formik={formik} />

                            {/* app card : bottom-bar */}
                            <div className={`app-card action-btns ${props.sideBarVisibility ? "" : "sidebar-expanded"}`}>
                                <div className="app-card-content bg-white border-top st-border-light d-flex align-items-center justify-content-end">
                                    <Link to="/catalog/brands" className="st-btn st-btn-link no-min-width d-flex align-items-center justify-content-center me-1">
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
                                                <span>Update Brand</span>
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

export default connect(getDataFromStore, dispatchActionsToProps)(EditBrand)