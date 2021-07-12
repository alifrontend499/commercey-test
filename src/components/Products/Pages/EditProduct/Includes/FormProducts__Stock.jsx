import React, { memo } from 'react'

function FormProducts__Stock(props) {
    const { formik } = props

    return (
        <React.Fragment>
            {/* form field */}
            <div className={`st-form st-form-with-label-left no-arrows d-flex flex-wrap align-items-center ${(formik.touched.stock && formik.errors.stock) ? "has-msg msg-error" : ""}`}>
                <label>
                    Stock 
                    <span className="required">*</span>
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Stock"
                        id="stock"
                        {...formik.getFieldProps('stock')} />
                    {
                        /* form message */
                        (formik.touched.stock && formik.errors.stock) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.stock}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left no-arrows d-flex flex-wrap align-items-center ${(formik.touched.lowStock && formik.errors.lowStock) ? "has-msg msg-error" : ""}`}>
                <label>
                    Low Stock
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Low Stock"
                        id="lowStock"
                        {...formik.getFieldProps('lowStock')} />
                    {
                        /* form message */
                        (formik.touched.lowStock && formik.errors.lowStock) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.lowStock}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left no-arrows d-flex flex-wrap align-items-center ${(formik.touched.maxOrderQuantity && formik.errors.maxOrderQuantity) ? "has-msg msg-error" : ""}`}>
                <label>
                    Max Order Quantity
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Max Order Quantity"
                        id="maxOrderQuantity"
                        {...formik.getFieldProps('maxOrderQuantity')} />
                    {
                        /* form message */
                        (formik.touched.maxOrderQuantity && formik.errors.maxOrderQuantity) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.maxOrderQuantity}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left no-arrows d-flex flex-wrap align-items-center ${(formik.touched.minOrderQuantity && formik.errors.minOrderQuantity) ? "has-msg msg-error" : ""}`}>
                <label>
                    Min Order Quantity
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Min Order Quantity"
                        id="minOrderQuantity"
                        {...formik.getFieldProps('minOrderQuantity')} />
                    {
                        /* form message */
                        (formik.touched.minOrderQuantity && formik.errors.minOrderQuantity) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{formik.errors.minOrderQuantity}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default memo(FormProducts__Stock)