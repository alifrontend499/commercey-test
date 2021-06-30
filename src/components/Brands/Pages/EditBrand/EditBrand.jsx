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
import BrandDetailsFields from './Includes/EditBrand__BrandDetails'

// APIs
import { editBrand, getBrandDetails, cancelGetBrandDetailsApi } from 'utlis/Apis/Brands_API'

// actions
import { setGlobalLoading } from 'redux/actions/actionCommon'

function EditBrand(props) {
    // error and success messages
    const BRAND_UPDATED_SUCCESSFULLY = "Brand updated successfully."
    const ERROR_WHILE_UPDATING_BRAND = "Error occured!! please check if all the required fields are filled correctly."
    const ERROR_WHILE_LOADING_BRAND = "No detail found."
    const UNKNOWN_ERROR = "Unknown error occured. please try again."
    
    // refs
    const submitButtonRef = useRef(null)

    // states
    const [editButtonDisable, setEditButtonDisable] = useState(false)
    const [editButtonLoading, setEditButtonLoading] = useState(false)

    const [brandName, setBrandName] = useState("")

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
            const brand = locState.brandsDetails
            setBrandName((brand && brand.manufacturer_name) && brand.manufacturer_name.toString())
        }
    }, [props])

    // geting form values from the database if not found in the url
    useEffect(() => {
        const locState = props.location.state
        // if state with the user exists in the location
        if (!locState) {
            // enabling the global loading
            props.setGlobalLoading(true)
            // loading the user from the database
            const brandId = props.match.params.id ?? ""

            // getting single brand details
            getBrandDetails(props.currentUser.userToken, brandId).then(res => {
                const brand = res.data

                // disabling the global loading
                props.setGlobalLoading(false)

                // if request is success
                if (brand.success) {
                    const brandsData = brand.data
                    setBrandName((brandsData && brandsData.manufacturer_name) && brandsData.manufacturer_name.toString())
                }
                // if request is not succeed
                if (brand.error) {
                    console.log(ERROR_WHILE_LOADING_BRAND, res)

                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.error(ERROR_WHILE_LOADING_BRAND, {
                        autoClose: 3000,
                    })
                }
            }).catch(err => {
                console.log('err while getBrandDetails api ', err.message)

                // disabling the global loading
                props.setGlobalLoading(false)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(UNKNOWN_ERROR, {
                    autoClose: 3000,
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
        brandName
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
                console.log('err while editBrand api ', err.message)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(UNKNOWN_ERROR, {
                    autoClose: 3000,
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
                            {/* app card */}
                            <div className="app-card mb-3 mb-lg-4">
                                {/* card heading */}
                                <div className="app-header-wrapper heading-sm mb-1">
                                    {/* heading */}
                                    <p className="app-heading text-capitalize">Details</p>
                                </div>

                                <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-20-LR pad-20-T">
                                    <Col xs={12} md={9} lg={6} className="px-0">
                                        <BrandDetailsFields
                                            formik={formik}
                                        />
                                    </Col>
                                </div>
                            </div>

                            {/* app card : bottom-bar */}
                            <div className="app-card action-btns">
                                <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-15 d-flex align-items-center justify-content-end">
                                    <Link to="/catalog/brands" className="st-btn st-btn-link no-min-width d-flex align-items-center justify-content-center me-1">
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
        currentUser: state.auth.currentUser
    };
}

const dispatchActionsToProps = dispatch => {
    return {
        setGlobalLoading: bool => dispatch(setGlobalLoading(bool)),
    }
}

export default connect(getDataFromStore, dispatchActionsToProps)(EditBrand)