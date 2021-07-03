import React from 'react'

export default function FormProduct__Stock(props) {
    return (
        <React.Fragment>
            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.stock && props.formik.errors.stock) ? "has-msg msg-error" : ""}`}>
                <label>
                    Stock 
                    <span>*</span>
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Stock"
                        id="stock"
                        {...props.formik.getFieldProps('stock')} />
                    {
                        /* form message */
                        (props.formik.touched.stock && props.formik.errors.stock) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.stock}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.lowStock && props.formik.errors.lowStock) ? "has-msg msg-error" : ""}`}>
                <label>
                    Low Stock 
                    {/* <span>*</span> */}
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Low Stock"
                        id="lowStock"
                        {...props.formik.getFieldProps('lowStock')} />
                    {
                        /* form message */
                        (props.formik.touched.lowStock && props.formik.errors.lowStock) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.lowStock}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.maxOrderQuantity && props.formik.errors.maxOrderQuantity) ? "has-msg msg-error" : ""}`}>
                <label>
                    Max Order Quantity 
                    {/* <span>*</span> */}
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Max Order Quantity"
                        id="maxOrderQuantity"
                        {...props.formik.getFieldProps('maxOrderQuantity')} />
                    {
                        /* form message */
                        (props.formik.touched.maxOrderQuantity && props.formik.errors.maxOrderQuantity) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.maxOrderQuantity}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.minOrderQuantity && props.formik.errors.minOrderQuantity) ? "has-msg msg-error" : ""}`}>
                <label>
                    Min Order Quantity 
                    {/* <span>*</span> */}
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Min Order Quantity"
                        id="minOrderQuantity"
                        {...props.formik.getFieldProps('minOrderQuantity')} />
                    {
                        /* form message */
                        (props.formik.touched.minOrderQuantity && props.formik.errors.minOrderQuantity) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.minOrderQuantity}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </React.Fragment>
    )
}
