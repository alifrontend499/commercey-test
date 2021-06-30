import React from 'react'

export default function FormProduct__Details(props) {
    const { parentCategories } = props
    return (
        <React.Fragment>
            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.productName && props.formik.errors.productName) ? "has-msg msg-error" : ""}`}>
                <label>Product Name <span>*</span></label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Product Name"
                        id="productName"
                        {...props.formik.getFieldProps('productName')} />
                    {
                        /* form message */
                        (props.formik.touched.productName && props.formik.errors.productName) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.productName}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.SKU && props.formik.errors.SKU) ? "has-msg msg-error" : ""}`}>
                <label>SKU <span>*</span></label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="SKU"
                        id="SKU"
                        {...props.formik.getFieldProps('SKU')} />
                    {
                        /* form message */
                        (props.formik.touched.SKU && props.formik.errors.SKU) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.SKU}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.status && props.formik.errors.status) ? "has-msg msg-error" : ""}`}>
                <label>Status <span>*</span></label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="status"
                        {...props.formik.getFieldProps('status')}>
                        <option disabled value="">Select Status</option>
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                    </select>
                    {
                        /* form message */
                        (props.formik.touched.status && props.formik.errors.status) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.status}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.categoryId && props.formik.errors.categoryId) ? "has-msg msg-error" : ""}`}>
                <label>Category <span>*</span></label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="categoryId"
                        {...props.formik.getFieldProps('categoryId')}>
                        <option disabled value="">Select Category</option>
                        <option value="1">Category 1</option>
                        <option value="0">Category 2</option>
                        <option value="0">Category 3</option>
                    </select>
                    {
                        /* form message */
                        (props.formik.touched.categoryId && props.formik.errors.categoryId) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.categoryId}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.brandId && props.formik.errors.brandId) ? "has-msg msg-error" : ""}`}>
                <label>Brand <span>*</span></label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="brandId"
                        {...props.formik.getFieldProps('brandId')}>
                        <option disabled value="">Select Brand</option>
                        <option value="1">Brand 1</option>
                        <option value="0">Brand 2</option>
                        <option value="0">Brand 3</option>
                    </select>
                    {
                        /* form message */
                        (props.formik.touched.brandId && props.formik.errors.brandId) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.brandId}</p>
                            </div>
                        )
                    }
                </div>
            </div>

        </React.Fragment>
    )
}
