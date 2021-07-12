import React, { memo } from 'react'

function FormProducts__Details(props) {
    const { parentCategories, brands, formik } = props

    return (
        <React.Fragment>
            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.productName && formik.errors.productName) ? "has-msg msg-error" : ""}`}>
                <label>
                    Product Name
                    <span className="required">*</span>
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Product Name"
                        id="productName"
                        {...formik.getFieldProps('productName')} />
                    {
                        /* form message */
                        (formik.touched.productName && formik.errors.productName) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.productName}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.SKU && formik.errors.SKU) ? "has-msg msg-error" : ""}`}>
                <label>
                    SKU
                    <span className="required">*</span>
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="SKU"
                        id="SKU"
                        {...formik.getFieldProps('SKU')} />
                    {
                        /* form message */
                        (formik.touched.SKU && formik.errors.SKU) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.SKU}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.status && formik.errors.status) ? "has-msg msg-error" : ""}`}>
                <label>
                    Status
                    <span className="required">*</span>
                </label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="status"
                        {...formik.getFieldProps('status')}>
                        <option disabled value="">Select Status</option>
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                    </select>
                    {
                        /* form message */
                        (formik.touched.status && formik.errors.status) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.status}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.categoryId && formik.errors.categoryId) ? "has-msg msg-error" : ""}`}>
                <label>
                    Category
                    <span className="required">*</span>
                </label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="categoryId"
                        {...formik.getFieldProps('categoryId')}>
                        <option disabled value="">Select Category</option>
                        {
                            (parentCategories && parentCategories.length) && parentCategories.map(item => (
                                <option key={item.category_id} value={item.category_id}>{item.category_name}</option>
                            ))
                        }
                    </select>
                    {
                        /* form message */
                        (formik.touched.categoryId && formik.errors.categoryId) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.categoryId}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(formik.touched.brandId && formik.errors.brandId) ? "has-msg msg-error" : ""}`}>
                <label>
                    Brand
                </label>
                <div className="media-body st-form-input-container">
                    <select
                        className="form-control"
                        id="brandId"
                        {...formik.getFieldProps('brandId')}>
                        <option disabled value="">Select Brand</option>
                        {
                            (brands && brands.length) && brands.map(item => (
                                <option key={item.manufacturer_id} value={item.manufacturer_id}>{item.manufacturer_name}</option>
                            ))
                        }
                    </select>
                    {
                        /* form message */
                        (formik.touched.brandId && formik.errors.brandId) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.brandId}</p>
                            </div>
                        )
                    }
                </div>
            </div>

        </React.Fragment>
    )
}

export default memo(FormProducts__Details)