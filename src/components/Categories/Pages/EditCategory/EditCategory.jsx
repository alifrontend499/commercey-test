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
import CategoryDetailsFields from './Includes/EditCategory__CategoryDetails'
import CategoryDescriptionFields from './Includes/EditCategory__Description'
import CategorySEOFields from './Includes/EditCategory__SEO'

// APIs
import { getCategories, cancelGetCategoriesApi, getCategoryDetails, cancelGetCategoryDetailsApi, editCategory } from 'utlis/Apis/Categories_API'

// actions
import { setGlobalLoading } from 'redux/actions/actionCommon'

// app messages
import {
    UNKNOWN_ERROR_OCCURED,
    ERROR_WHILE__NAME,
    CATEGORY_UPDATED_SUCCESSFULLY,
    ERROR_WHILE_UPDATING_CATEGORY,
    ERROR_WHILE_GETTING_CATEGORY_DETAILS,
} from 'utlis/AppMessages/AppMessages'

function EditCategory(props) {
    // refs
    const submitButtonRef = useRef(null)

    // states
    const [editButtonDisable, setEditButtonDisable] = useState(false)
    const [editButtonLoading, setEditButtonLoading] = useState(false)

    const [parentCategories, setParentCategories] = useState([])

    const [categoryId, setCategoryId] = useState([])

    // on page load
    useEffect(() => {
        const categoryIdFromUrl = props.match.params;
        // setting user id from the url
        if (categoryIdFromUrl) {
            setCategoryId(categoryIdFromUrl.id)
        }

        // getting parent categories
        getCategories(props.currentUser.userToken, "parent_id=0&limit=100").then(res => {
            const parentCategories = res.data

            // if request is success
            if (parentCategories.success) {
                setParentCategories(parentCategories.data)
            }

            // if request is not succeed
            if (parentCategories.error) {
                console.log('Error occured while loading parent categories!', res)
            }
        }).catch(err => {
            console.log(`${ERROR_WHILE__NAME} getCategories `, err.message)

            // dismissing all the previous toasts first
            toast.dismiss();

            // showing the error message
            toast.error(UNKNOWN_ERROR_OCCURED, {
                autoClose: 2500
            })
        })

        return () => {
            // canceling get categories api when user leaves the component
            cancelGetCategoriesApi()
        }
    }, [])

    // geting form values from the url
    useEffect(() => {
        const locState = props.location.state ?? props.location.state

        // if state with the category exists in the location
        if (locState) {
            const category = locState.categoryDetails
            setTimeout(() => {
                // setting the fields values
                formik.setFieldValue("categoryName", category?.category_name?.toString() ?? "")
                formik.setFieldValue("status", category?.status?.toString() ?? "")
                formik.setFieldValue("description", category?.description?.toString() ?? "")
                formik.setFieldValue("parentCategoryName", category?.parent_id?.toString() ?? "")
                formik.setFieldValue("metaTitle", category?.meta_title?.toString() ?? "")
                formik.setFieldValue("metaKeyword", category?.meta_keywords?.toString() ?? "")
                formik.setFieldValue("metaDescription", category?.meta_description?.toString() ?? "")
                formik.setFieldValue("image", category?.image?.toString() ?? "")
            }, 0);
        }
    }, [props])

    // geting form values from the database if not found in the url
    useEffect(() => {
        const locState = props.location.state ?? props.location.state
        // if state with the user exists in the location
        if (!locState) {
            // enabling the global loading
            props.setGlobalLoading(true)
            // loading the user from the database
            const catId = props.match.params.id ?? ""

            // getting single category details
            getCategoryDetails(props.currentUser.userToken, catId).then(res => {
                const category = res.data

                // disabling the global loading
                props.setGlobalLoading(false)

                // if request is success
                if (category.success) {
                    const catData = category.data
                    // setting the fields values
                    formik.setFieldValue("categoryName", catData?.category_name?.toString() ?? "")
                    formik.setFieldValue("status", catData?.status?.toString() ?? "")
                    formik.setFieldValue("description", catData?.description?.toString() ?? "")
                    formik.setFieldValue("parentCategoryName", catData?.parent_id?.toString() ?? "")
                    formik.setFieldValue("metaTitle", catData?.meta_title?.toString() ?? "")
                    formik.setFieldValue("metaKeyword", catData?.meta_keywords?.toString() ?? "")
                    formik.setFieldValue("metaDescription", catData?.meta_description?.toString() ?? "")
                    formik.setFieldValue("image", catData?.image?.toString() ?? "")
                }
                // if request is not succeed
                if (category.error) {
                    console.log(ERROR_WHILE_GETTING_CATEGORY_DETAILS, res)

                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.error(ERROR_WHILE_GETTING_CATEGORY_DETAILS, {
                        autoClose: 3000,
                    })
                }
            }).catch(err => {
                console.log(`${ERROR_WHILE__NAME} getCategoryDetails `, err.message)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(UNKNOWN_ERROR_OCCURED, {
                    autoClose: 2500,
                    onClose: () => {
                        // disabling the global loading
                        props.setGlobalLoading(false)
                    }
                })
            })

            return () => {
                // disabling the global loading
                props.setGlobalLoading(false)

                // canceling admin users api when user leaves the component
                cancelGetCategoryDetailsApi()
            }
        }
    }, [])

    // initial form values
    const initialEditFormValues = {
        categoryName: "",
        status: "",
        parentCategoryName: "",
        description: "",
        metaTitle: "",
        metaKeyword: "",
        metaDescription: "",
        image: "",
    }

    // handle form validations
    const editFormValidationSchema = Yup.object({
        categoryName: Yup.string().required('This field is required'),
        status: Yup.string(),
        parentCategoryName: Yup.string(),
        description: Yup.string(),
        metaTitle: Yup.string(),
        metaKeyword: Yup.string(),
        metaDescription: Yup.string(),
        image: Yup.string(),
    })

    // handle form submmision
    const onEditFormSubmit = values => {
        if (values) {
            // enabling global loading
            setGlobalLoading(true)

            // enabling the button and enabling loading
            setEditButtonDisable(true)
            setEditButtonLoading(true)

            // saving details in the databse
            const dataToBeSaved = {
                category_id: categoryId,
                category_name: values.categoryName,
                description: values.description,
                status: values.status,
                parent_id: values.parentCategoryName,
                meta_title: values.metaTitle,
                meta_keywords: values.metaKeyword,
                meta_description: values.metaDescription,
                image: values.image,
            }

            // updating the details from the database
            editCategory(props.currentUser.userToken, dataToBeSaved).then(res => {
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
                    toast.success(CATEGORY_UPDATED_SUCCESSFULLY, {
                        autoClose: 3000
                    })
                }

                // if some error
                if (updatedData.error) {
                    console.log(ERROR_WHILE_UPDATING_CATEGORY, res)
                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.error(ERROR_WHILE_UPDATING_CATEGORY, {
                        autoClose: 3000
                    })
                }
            }).catch(err => {
                console.log(`${ERROR_WHILE__NAME} editCategory `, err.message)

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

    // html editor
    const getHTML_editorResult = (data) => {
        // setting the description value
        formik.setFieldValue("description", data)
    }

    return (
        <section id="app-categories__edit-details" className="st-def-mar-TB">
            <Container fluid className="st-container">
                <div className="app-categories__edit-details">
                    {/* BACK BUTTON WRAPPER */}
                    <div className="back-button-wrapper mb-2">
                        <Link to="/catalog/categories" className="text-decoration-none st-text-primary d-inline-flex align-items-center cursor-pointer st-fs-15">
                            <FeatherIcon
                                icon="arrow-left"
                                size="14"
                                className="icon me-1" />
                            <span>Back to categories</span>
                        </Link>
                    </div>

                    {/* HEADING WRAPPER */}
                    <div className="app-header-wrapper mb-3">
                        {/* heading */}
                        <p className="app-heading text-capitalize">edit Category</p>
                        <p className="app-desc">
                            Edit a category for your products.
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
                                        <CategoryDetailsFields
                                            formik={formik}
                                            parentCategories={parentCategories}
                                        />
                                    </Col>
                                </div>
                            </div>

                            {/* app card */}
                            <div className="app-card mb-3 mb-lg-4">
                                {/* card heading */}
                                <div className="app-header-wrapper heading-sm mb-1">
                                    {/* heading */}
                                    <p className="app-heading text-capitalize">Description</p>
                                </div>

                                <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-20">
                                    <Col xs={12} md={9} className="px-0">
                                        <CategoryDescriptionFields
                                            formik={formik}
                                            getResult={getHTML_editorResult}
                                        />
                                    </Col>
                                </div>
                            </div>

                            {/* app card */}
                            <div className="app-card mb-3 mb-lg-4">
                                {/* card heading */}
                                <div className="app-header-wrapper heading-sm mb-1">
                                    {/* heading */}
                                    <p className="app-heading text-capitalize">SEO</p>
                                </div>

                                <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-20-LR pad-20-T">
                                    <Col xs={12} md={9} lg={6} className="px-0">
                                        <CategorySEOFields
                                            formik={formik}
                                        />
                                    </Col>
                                </div>
                            </div>

                            {/* app card : bottom-bar */}
                            <div className={`app-card action-btns ${props.sideBarVisibility ? "" : "sidebar-expanded"}`}>
                                <div className="app-card-content bg-white border-top st-border-light d-flex align-items-center justify-content-end">
                                    <Link to="/catalog/categories" className="st-btn st-btn-link no-min-width d-flex align-items-center justify-content-center me-1">
                                        Cancel
                                    </Link>

                                    <button
                                        type="submit"
                                        // className="st-btn st-btn-primary d-flex align-items-center justify-content-center"
                                        className={`st-btn st-btn-primary d-flex align-items-center justify-content-center ${(editButtonDisable || Object.keys(formik.errors).length) ? "disabled" : ""}`}
                                        disabled={editButtonDisable}
                                        onClick={handleFormSubmission}>
                                        {
                                            editButtonLoading ? (
                                                <Spinner animation="border" size="sm" />
                                            ) : (
                                                <span>Update Category</span>
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

export default connect(getDataFromStore, dispatchActionsToProps)(EditCategory)