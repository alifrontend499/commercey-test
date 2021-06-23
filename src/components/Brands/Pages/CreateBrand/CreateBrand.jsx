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
import CategoryDetailsFields from './Includes/CreateCategory__CategoryDetails'
import CategoryDescriptionFields from './Includes/CreateCategory__Description'
import CategorySEOFields from './Includes/CreateCategory__SEO'

// APIs
import { getCategories, cancelGetCategoriesApi, addCategory } from 'utlis/Apis/Categories_API'

// actions
import { setGlobalLoading } from 'redux/actions/actionCommon'

function CreateBrand(props) {
    // error and success messages
    const SOME_ERROR_OCCURED = "Unable to create the category. please try again."
    const CATEGORY_ADDED_SUCCESSFULLY = "Category created successfully."
    const ERROR_WHILE_CREATING_CATEGORY = "Error occured!! please check if all the required fields are filled correctly."

    // refs
    const submitButtonRef = useRef(null)

    // states
    const [createButtonDisable, setCreateButtonDisable] = useState(false)
    const [createButtonLoading, setCreateButtonLoading] = useState(false)

    const [categoryName, setCategoryName] = useState("")
    const [status, setStatus] = useState("")
    const [description, setDescription] = useState("")
    const [parentCategoryName, setParentCategoryName] = useState("")
    const [metaTitle, setMetaTitle] = useState("")
    const [metaKeyword, setMetaKeyword] = useState("")
    const [metaDescription, setMetaDescription] = useState("")
    const [image, setImage] = useState("")

    const [parentCategories, setParentCategories] = useState([])

    // on page load
    useEffect(() => {
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
            console.log('err ', err.message)
        })

        return () => {
            // canceling get categories api when user leaves the component
            cancelGetCategoriesApi()
        }
    }, [])

    // initial form values
    const initialCreateFormValues = {
        categoryName,
        status,
        parentCategoryName,
        metaTitle,
        metaKeyword,
        metaDescription,
        image,
    }

    // handle form validations
    const createFormValidationSchema = Yup.object({
        categoryName: Yup.string().required('This field is required'),
        status: Yup.string(),
        parentCategoryName: Yup.string(),
        metaTitle: Yup.string(),
        metaKeyword: Yup.string(),
        metaDescription: Yup.string(),
        image: Yup.string(),
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
                category_name: values.categoryName,
                description: description,
                status: values.status,
                parent_id: values.parentCategoryName,
                meta_title: values.metaTitle,
                meta_keywords: values.metaKeyword,
                meta_description: values.metaDescription,
                image: values.image,
            }

            // saving data
            addCategory(props.currentUser.userToken, dataToBeSaved).then(res => {
                console.log('res from update user ', res)
                // disabling global loading
                setGlobalLoading(false)

                // disbling the button and enabling loading
                setCreateButtonDisable(false)
                setCreateButtonLoading(false)

                const addingData = res.data

                // if request is success
                if (addingData.success) {
                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // redirecting to users
                    props.history.push('/catalog/categories', {
                        shouldReload: true
                    })


                    // showing the error message
                    toast.success(CATEGORY_ADDED_SUCCESSFULLY, {
                        autoClose: 2500,
                    })

                    // empty the fields
                    setCategoryName("")
                    setDescription("")
                    setStatus("")
                    setParentCategoryName("")
                    setMetaTitle("")
                    setMetaKeyword("")
                    setMetaDescription("")
                    setImage("")
                }

                // if request is not succeed
                if (addingData.error) {
                    console.log(ERROR_WHILE_CREATING_CATEGORY, res)

                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.error(ERROR_WHILE_CREATING_CATEGORY, {
                        autoClose: 3000,
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

    // html editor
    const getHTML_editorResult = (data) => {
        // setting description
        setDescription(data)
    }

    return (
        <section id="app-categories__create-details" className="st-def-mar-TB">
            <Container fluid className="st-container">
                <div className="app-categories__create-details">
                    {/* HEADING WRAPPER */}
                    <div className="app-header-wrapper mb-3">
                        {/* heading */}
                        <p className="app-heading text-capitalize">Create Category</p>
                        <p className="app-desc">
                            Create a category for your products.
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
                                            defaultValue={description}
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
                            <div className="app-card action-btns">
                                <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-15 d-flex align-items-center justify-content-end">
                                    <Link to="/catalog/categories" className="st-btn st-btn-link no-min-width d-flex align-items-center justify-content-center me-1">
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
                                                <span>Create Category</span>
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