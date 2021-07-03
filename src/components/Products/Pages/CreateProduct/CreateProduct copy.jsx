import React, { useState, useRef, useEffect } from 'react'

// redux
import { connect } from 'react-redux'

// bootstrap
import {
    Container,
    Col,
    Spinner,
    Tabs,
    Tab
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
import ProductDetailsFields from './Includes/FormProduct__Details'
import ProductPriceFields from './Includes/FormProduct__Price'
import ProductDescriptionFields from './Includes/FormProduct__Description'
import ProductStockFields from './Includes/FormProduct__Stock'
import ProductDimensionsFields from './Includes/FromProduct__Dimensions'
import ProductSEOFields from './Includes/FormProduct__SEO'

// APIs
// import { deleteProduct } from 'utlis/Apis/Products_API'

// actions
import { setGlobalLoading } from 'redux/actions/actionCommon'

function CreateProduct(props) {
    // error and success messages
    const SOME_ERROR_OCCURED = "Unable to create the product. please try again."
    const CATEGORY_ADDED_SUCCESSFULLY = "Product created successfully."
    const ERROR_WHILE_CREATING_CATEGORY = "Error occured!! please check if all the required fields are filled correctly."

    // refs
    const submitButtonRef = useRef(null)

    // states
    const [createButtonDisable, setCreateButtonDisable] = useState(false)
    const [createButtonLoading, setCreateButtonLoading] = useState(false)

    const [detailsTabHasError, setDetailsTabHasError] = useState(false)
    const [priceTabHasError, setPriceTabHasError] = useState(false)
    const [descriptionTabHasError, setDescriptionTabHasError] = useState(false)
    const [stockTabHasError, setStockTabHasError] = useState(false)
    const [dimensionsTabHasError, setDimensionsTabHasError] = useState(false)
    const [SEOTabHasError, setSEOTabHasError] = useState(false)

    const [productName, setProductName] = useState("")
    const [SKU, setSKU] = useState("")
    const [status, setStatus] = useState("")
    const [costPrice, setCostPrice] = useState("")
    const [price, setPrice] = useState("")
    const [promoPrice, setPromoPrice] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [brandId, setBrandId] = useState("")
    const [shortDescription, setShortDescription] = useState("hello")
    const [longDescription, setLongDescription] = useState("bye")
    const [stock, setStock] = useState("")
    const [lowStock, setLowStock] = useState("")
    const [maxOrderQuantity, setMaxOrderQuantity] = useState("")
    const [minOrderQuantity, setMinOrderQuantity] = useState("")
    const [weight, setWeight] = useState("")
    const [width, setWidth] = useState("")
    const [depth, setDepth] = useState("")
    const [height, setHeight] = useState("")
    const [metaTitle, setMetaTitle] = useState("")
    const [metaDescription, setMetaDescription] = useState("")

    const [parentCategories, setParentCategories] = useState([])

    // initial form values
    const initialCreateFormValues = {
        productName,
        SKU,
        status,
        costPrice,
        price,
        promoPrice,
        categoryId,
        brandId,
        stock,
        lowStock,
        maxOrderQuantity,
        minOrderQuantity,
        weight,
        width,
        depth,
        height,
        metaTitle,
        metaDescription
    }

    // handle form validations
    const createFormValidationSchema = Yup.object({
        productName: Yup.string().required('This field is required'),
        SKU: Yup.string().required('This field is required'),
        status: Yup.string().required('This field is required'),
        costPrice: Yup.string().required('This field is required'),
        price: Yup.string().required('This field is required'),
        promoPrice: Yup.string().required('This field is required'),
        categoryId: Yup.string().required('This field is required'),
        brandId: Yup.string().required('This field is required'),
        stock: Yup.string().required('This field is required'),
        lowStock: Yup.string().required('This field is required'),
        maxOrderQuantity: Yup.string().required('This field is required'),
        minOrderQuantity: Yup.string().required('This field is required'),
        weight: Yup.string().required('This field is required'),
        width: Yup.string().required('This field is required'),
        depth: Yup.string().required('This field is required'),
        height: Yup.string().required('This field is required'),
        metaTitle: Yup.string().required('This field is required'),
        metaDescription: Yup.string().required('This field is required'),
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
                product_name: values.product_name,
                sku: values.sku,
                status: values.status,
                cost_price: values.cost_price,
                price: values.price,
                promo_price: values.promo_price,
                category_id: values.category_id,
                brand_id: values.brand_id,
                short_description: shortDescription,
                long_description: longDescription,
                stock: values.stock,
                low_stock: values.low_stock,
                max_order_quantity: values.max_order_quantity,
                min_order_quantity: values.min_order_quantity,
                weight: values.weight,
                width: values.width,
                depth: values.depth,
                height: values.height,
                meta_title: values.meta_title,
                meta_description: values.meta_description,
            }
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
        // long description
        setLongDescription(data)
    }
    const getHTML_editorResultShortDesc = (data) => {
        // short description
        setShortDescription(data)
    }

    return (
        <section id="app-products__create-product" className="st-def-mar-TB">
            <Container fluid className="st-container">
                <div className="app-products__create-product">
                    {/* HEADING WRAPPER */}
                    <div className="app-header-wrapper mb-3">
                        {/* heading */}
                        <p className="app-heading text-capitalize">Create Product</p>
                        <p className="app-desc">
                            Create a product.
                        </p>
                    </div>

                    {/* CONTENT WRAPPER */}
                    <form
                        onSubmit={formik.handleSubmit}
                        noValidate
                        autoComplete="off">
                        <div className="app-content-container">
                            <Tabs defaultActiveKey="detailsFields" id="uncontrolled-tab-example">
                                {/* tab item */}
                                <Tab eventKey="detailsFields" title="Details" tabClassName={`${(
                                    (formik.touched.productName && formik.errors.productName) ||
                                    (formik.touched.SKU && formik.errors.SKU) ||
                                    (formik.touched.status && formik.errors.status) ||
                                    (formik.touched.categoryId && formik.errors.categoryId) ||
                                    (formik.touched.brandId && formik.errors.brandId)) ?
                                    "has-error"
                                    : "no-error"
                                    }`}>
                                    {/* app card */}
                                    <div className="app-card mb-3 mb-lg-4">
                                        {/* card heading */}
                                        <div className="app-header-wrapper heading-sm mb-1">
                                            {/* heading */}
                                            <p className="app-heading text-capitalize">Details</p>
                                        </div>

                                        <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-20-LR pad-20-T">
                                            <Col xs={12} md={9} lg={6} className="px-0">
                                                <ProductDetailsFields
                                                    setPageError={setDetailsTabHasError}
                                                    formik={formik}
                                                    parentCategories={parentCategories}
                                                />
                                            </Col>
                                        </div>
                                    </div>
                                </Tab>

                                {/* tab item */}
                                <Tab eventKey="priceFields" title="Price" tabClassName={`${(
                                    (formik.touched.costPrice && formik.errors.costPrice) ||
                                    (formik.touched.price && formik.errors.price) ||
                                    (formik.touched.promoPrice && formik.errors.promoPrice)) ?
                                    "has-error"
                                    : "no-error"
                                    }`}>
                                    {/* app card */}
                                    < div className="app-card mb-3 mb-lg-4">
                                        {/* card heading */}
                                        <div className="app-header-wrapper heading-sm mb-1">
                                            {/* heading */}
                                            <p className="app-heading text-capitalize">Price</p>
                                        </div>

                                        <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-20-LR pad-20-T">
                                            <Col xs={12} md={9} lg={6} className="px-0">
                                                <ProductPriceFields
                                                    setPageError={setPriceTabHasError}
                                                    formik={formik}
                                                    parentCategories={parentCategories}
                                                />
                                            </Col>
                                        </div>
                                    </div>
                                </Tab>

                                {/* tab item */}
                                <Tab eventKey="descriptionFields" title="Description">
                                    {/* app card */}
                                    <div className="app-card mb-3 mb-lg-4">
                                        {/* card heading */}
                                        <div className="app-header-wrapper heading-sm mb-1">
                                            {/* heading */}
                                            <p className="app-heading text-capitalize">Description</p>
                                        </div>

                                        <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-20">
                                            <Col xs={12} md={9} className="px-0">
                                                <ProductDescriptionFields
                                                    setPageError={setDescriptionTabHasError}
                                                    formik={formik}
                                                    defaultValueForShortDesc={shortDescription}
                                                    defaultValueForLongDesc={longDescription}

                                                    getShortDesc={getHTML_editorResultShortDesc}
                                                    getLongDesc={getHTML_editorResultLongDesc}
                                                />
                                            </Col>
                                        </div>
                                    </div>
                                </Tab>

                                {/* tab item */}
                                <Tab eventKey="stockAndQuantityFields" title="StockAndQuantity" tabClassName={`${(
                                    (formik.touched.stock && formik.errors.stock) ||
                                    (formik.touched.lowStock && formik.errors.lowStock) ||
                                    (formik.touched.maxOrderQuantity && formik.errors.maxOrderQuantity) ||
                                    (formik.touched.minOrderQuantity && formik.errors.minOrderQuantity)) ?
                                    "has-error"
                                    : "no-error"
                                    }`}>
                                    {/* app card */}
                                    <div className="app-card mb-3 mb-lg-4">
                                        {/* card heading */}
                                        <div className="app-header-wrapper heading-sm mb-1">
                                            {/* heading */}
                                            <p className="app-heading text-capitalize">Stock & Quantity</p>
                                        </div>

                                        <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-20-LR pad-20-T">
                                            <Col xs={12} md={9} lg={6} className="px-0">
                                                <ProductStockFields
                                                    setPageError={setStockTabHasError}
                                                    formik={formik}
                                                />
                                            </Col>
                                        </div>
                                    </div>
                                </Tab>

                                {/* tab item */}
                                <Tab eventKey="dimensionsFields" title="Dimensions" tabClassName={`${(
                                    (formik.touched.weight && formik.errors.weight) ||
                                    (formik.touched.width && formik.errors.width) ||
                                    (formik.touched.height && formik.errors.height) ||
                                    (formik.touched.depth && formik.errors.depth)) ?
                                    "has-error"
                                    : "no-error"
                                    }`}>
                                    {/* app card */}
                                    <div className="app-card mb-3 mb-lg-4">
                                        {/* card heading */}
                                        <div className="app-header-wrapper heading-sm mb-1">
                                            {/* heading */}
                                            <p className="app-heading text-capitalize">Dimensions</p>
                                        </div>

                                        <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-20-LR pad-20-T">
                                            <Col xs={12} md={9} lg={6} className="px-0">
                                                <ProductDimensionsFields
                                                    setPageError={setDimensionsTabHasError}
                                                    formik={formik}
                                                />
                                            </Col>
                                        </div>
                                    </div>
                                </Tab>

                                {/* tab item */}
                                <Tab eventKey="SEOFields" title="SEO" tabClassName={`${(
                                    (formik.touched.metaTitle && formik.errors.metaTitle) ||
                                    (formik.touched.metaDescription && formik.errors.metaDescription)) ?
                                    "has-error"
                                    : "no-error"
                                    }`}>
                                    {/* app card */}
                                    <div className="app-card mb-3 mb-lg-4">
                                        {/* card heading */}
                                        <div className="app-header-wrapper heading-sm mb-1">
                                            {/* heading */}
                                            <p className="app-heading text-capitalize">SEO</p>
                                        </div>

                                        <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-20-LR pad-20-T">
                                            <Col xs={12} md={9} lg={6} className="px-0">
                                                <ProductSEOFields
                                                    setPageError={setSEOTabHasError}
                                                    formik={formik}
                                                />
                                            </Col>
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>

                            {/* app card : bottom-bar */}
                            <div className="app-card action-btns">
                                <div className="app-card-content bg-white border st-border-light st-default-rounded-block pad-15 d-flex align-items-center justify-content-end">
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
                        <button type="submit" ref={submitButtonRef} className="d-none">submit</button>
                    </form>

                </div>
            </Container>
        </section >
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

export default connect(getDataFromStore, dispatchActionsToProps)(CreateProduct)