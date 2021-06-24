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
import BrandDetailsFields from './Includes/CreateBrand__BrandDetails'

// APIs
import { addBrand } from 'utlis/Apis/Brands_API'

// actions
import { setGlobalLoading } from 'redux/actions/actionCommon'

function CreateBrand(props) {
    // error and success messages
    const SOME_ERROR_OCCURED = "Unable to create the brand. please try again."
    const BRAND_ADDED_SUCCESSFULLY = "Brand created successfully."
    const ERROR_WHILE_CREATING_BRAND = "Error occured!! please check if all the required fields are filled correctly."

    // refs
    const submitButtonRef = useRef(null)

    // states
    const [createButtonDisable, setCreateButtonDisable] = useState(false)
    const [createButtonLoading, setCreateButtonLoading] = useState(false)

    const [brandName, setBrandName] = useState("")

    // initial form values
    const initialCreateFormValues = {
        brandName
    }

    // handle form validations
    const createFormValidationSchema = Yup.object({
        brandName: Yup.string().required('This field is required'),
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
                console.log('res from update user ', res)
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
                            setBrandName("")

                            // redirecting to users
                            props.history.push('/catalog/brands', {
                                shouldReload: true
                            })
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
                console.log('err ', err.message)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(SOME_ERROR_OCCURED, {
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
                        <p className="app-heading text-capitalize">Create Brands</p>
                        <p className="app-desc">
                            Create a brand for your products.
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
                                        disabled={createButtonDisable}
                                        onClick={handleFormSubmission}>
                                        {
                                            createButtonLoading ? (
                                                <Spinner animation="border" size="sm" />
                                            ) : (
                                                <span>Create Brand</span>
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

export default connect(getDataFromStore, dispatchActionsToProps)(CreateBrand)