import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'

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
import ProductLeftBar from './Includes/ProductsFormLeftBar'
import ProductContentView from './Includes/ProductsFormContentView'

// APIs
import { addProduct } from 'utlis/Apis/Products_API'
import { getCategories, cancelGetCategoriesApi } from 'utlis/Apis/Categories_API'
import { getBrands, cancelGetBrandsApi } from 'utlis/Apis/Brands_API'

// actions
import { setGlobalLoading } from 'redux/actions/actionCommon'

// helpers
import { isInViewport } from 'utlis/helpers/Common/CommonHelperFunctions'

// app messages
import {
    UNKNOWN_ERROR_OCCURED,
    ERROR_WHILE__NAME,
    PRODUCT_ADDED_SUCCESSFULLY,
    ERROR_WHILE_CREATING_PRODUCT
} from 'utlis/AppMessages/AppMessages'

function CreateProduct(props) {
    // refs
    const submitButtonRef = useRef(null)

    // states
    const [createButtonDisable, setCreateButtonDisable] = useState(false)
    const [createButtonLoading, setCreateButtonLoading] = useState(false)

    const [parentCategories, setParentCategories] = useState([])
    const [brands, setBrands] = useState([])

    // initial form values
    const initialCreateFormValues = {
        productName: "",
        SKU: "",
        status: "",
        costPrice: "",
        price: "",
        promoPrice: "",
        categoryId: "",
        brandId: "",
        longDescription: "",
        shortDescription: "",
        stock: "",
        lowStock: "",
        maxOrderQuantity: "",
        minOrderQuantity: "",
        weight: "",
        width: "",
        depth: "",
        height: "",
        metaTitle: "",
        metaDescription: "",
    }

    // handle form validations
    const createFormValidationSchema = Yup.object({
        productName: Yup.string().required('This field is required'),
        SKU: Yup.string().required('This field is required'),
        status: Yup.string().required('This field is required'),
        costPrice: Yup.string(),
        price: Yup.string().required('This field is required'),
        promoPrice: Yup.string(),
        categoryId: Yup.string().required('This field is required'),
        brandId: Yup.string(),
        longDescription: Yup.string(),
        shortDescription: Yup.string(),
        stock: Yup.string().required('This field is required'),
        lowStock: Yup.string(),
        maxOrderQuantity: Yup.string(),
        minOrderQuantity: Yup.string(),
        weight: Yup.string(),
        width: Yup.string(),
        depth: Yup.string(),
        height: Yup.string(),
        metaTitle: Yup.string(),
        metaDescription: Yup.string(),
    })

    // getting parent categories
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
            console.log(`${ERROR_WHILE__NAME} getCategories `, err.message)

            // dismissing all the previous toasts first
            toast.dismiss();

            // showing the error message
            toast.error(UNKNOWN_ERROR_OCCURED, {
                autoClose: 2500,
            })
        })

        return () => {
            // canceling get categories api when user leaves the component
            cancelGetCategoriesApi()
        }
    }, [])

    // getting brands
    useEffect(() => {
        // getting brands
        getBrands(props.currentUser.userToken, "limit=-1").then(res => {
            const brandsRes = res.data

            // if request is success
            if (brandsRes.success) {
                setBrands(brandsRes.data)
            }

            // if request is not succeed
            if (brandsRes.error) {
                console.log('Error occured while loading brands!', res)
            }
        }).catch(err => {
            console.log(`${ERROR_WHILE__NAME} getBrands `, err.message)

            // dismissing all the previous toasts first
            toast.dismiss();

            // showing the error message
            toast.error(UNKNOWN_ERROR_OCCURED, {
                autoClose: 2500,
            })
        })

        return () => {
            // canceling get categories api when user leaves the component
            cancelGetBrandsApi()
        }
    }, [])

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
                product_name: values.productName,
                sku: values.SKU,
                status: values.status,
                cost_price: values.costPrice,
                price: values.price,
                promo_price: values.promoPrice,
                category_id: values.categoryId,
                brand_id: values.brandId,
                short_description: values.shortDescription,
                long_description: values.longDescription,
                stock: values.stock,
                low_stock: values.lowStock,
                max_order_quantity: values.maxOrderQuantity,
                min_order_quantity: values.minOrderQuantity,
                weight: values.weight,
                width: values.width,
                depth: values.depth,
                height: values.height,
                meta_title: values.metaTitle,
                meta_description: values.metaDescription,
            }

            // saving in databse
            addProduct(props.currentUser.userToken, dataToBeSaved).then(res => {
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
                    toast.success(PRODUCT_ADDED_SUCCESSFULLY, {
                        autoClose: 2000,
                        onClose: () => {
                            // redirecting to products
                            // props.history.push('/catalog/products', {
                            //     shouldReload: true
                            // })
                        }
                    })
                }

                // if request is not succeed
                if (addingData.error) {
                    console.log(ERROR_WHILE_CREATING_PRODUCT, res)

                    // disbling the button and enabling loading
                    setCreateButtonDisable(false)
                    setCreateButtonLoading(false)

                    // dismissing all the previous toasts first
                    toast.dismiss();

                    // showing the error message
                    toast.error(ERROR_WHILE_CREATING_PRODUCT, {
                        autoClose: 3000,
                    })
                }
            }).catch(err => {
                console.log(`${ERROR_WHILE__NAME} addProduct `, err.message)

                // dismissing all the previous toasts first
                toast.dismiss();

                // showing the error message
                toast.error(UNKNOWN_ERROR_OCCURED, {
                    autoClose: 2500,
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
    const getHTML_editorResultLongDesc = (data) => {
        // setting the long description value
        formik.setFieldValue("longDescription", data)
    }
    const getHTML_editorResultShortDesc = (data) => {
        // setting the short description value
        formik.setFieldValue("shortDescription", data)
    }

    // products left tab links click
    const handleTabLinkClick = (ev, target) => {
        ev.preventDefault()
        const targetElem = document.querySelector(target)
        const elem = document.querySelector(`.pfc-left-bar .frac > [data-target="${target}"]`)
        const otherElems = document.querySelectorAll(".pfc-left-bar .frac > a")

        if (targetElem) {
            // removing class from other links
            otherElems && otherElems.forEach(item => item.classList.remove('active'))

            // adding class to clicked link
            elem.classList.add('active')

            // scrolling into element
            targetElem.scrollIntoView()
        }
    }

    // scrolling action for tabs
    useEffect(() => {
        window.addEventListener('scroll', handleWindowScroll, true)
        return () => {
            window.removeEventListener('scroll', handleWindowScroll, true)
        }
    }, [])

    // handle window scroll
    function handleWindowScroll() {
        // tabs cards
        const tabElems = document.querySelectorAll('.pfc-content > .inner > .app-card')
        tabElems && tabElems.forEach(item => {
            if (isInViewport(item)) {
                const elem = document.querySelector(`.pfc-left-bar .frac > [data-target="#${item.getAttribute('id')}"]`)
                const otherElems = document.querySelectorAll(".pfc-left-bar .frac > a")

                // removing class from other links
                otherElems && otherElems.forEach(item => item.classList.remove('active'))

                // adding class to clicked link
                elem.classList.add('active')
            }
        })
    }

    return (
        <section id="app-products__create-product" className="st-def-mar-TB">
            <Container fluid className="st-container">
                <div className="app-products__create-product position-relative">
                    {/* HEADING WRAPPER */}
                    <div className="app-header-wrapper mb-3">
                        {/* heading */}
                        <p className="app-heading text-capitalize">Create Product</p>
                        <p className="app-desc">
                            Create a product.
                        </p>
                    </div>

                    <form
                        onSubmit={formik.handleSubmit}
                        noValidate
                        autoComplete="off">
                        <div className="product-form-container">
                            <div className="pfc-inner d-flex">
                                {/* left bar view */}
                                <ProductLeftBar
                                    formik={formik}
                                    parentProps={props}
                                    handleTabLinkClick={(ev, target) => handleTabLinkClick(ev, target)}
                                />

                                {/* content view */}
                                <ProductContentView
                                    formik={formik}

                                    parentProps={props}

                                    parentCategories={parentCategories}

                                    brands={brands}

                                    getShortDesc={getHTML_editorResultShortDesc}
                                    getLongDesc={getHTML_editorResultLongDesc}
                                />
                            </div>
                        </div>

                        {/* submit button */}
                        <button type="submit" ref={submitButtonRef} className="d-none">submit</button>
                    </form>

                    {/* app card : bottom-bar */}
                    <div className={`app-card action-btns ${props.sideBarVisibility ? "" : "sidebar-expanded"}`}>
                        <div className="app-card-content bg-white border-top st-border-light d-flex align-items-center justify-content-end">
                            <Link to="/catalog/products" className="st-btn st-btn-link no-min-width d-flex align-items-center justify-content-center me-1">
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className={`st-btn st-btn-primary d-flex align-items-center justify-content-center ${(createButtonDisable || Object.keys(formik.errors).length) ? "disabled" : ""}`}
                                disabled={createButtonDisable || Object.keys(formik.errors).length}
                                onClick={handleFormSubmission}>
                                {
                                    createButtonLoading ? (
                                        <Spinner animation="border" size="sm" />
                                    ) : (
                                        <span>Create Product</span>
                                    )
                                }
                            </button>
                        </div>
                    </div>

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

export default connect(getDataFromStore, dispatchActionsToProps)(CreateProduct)