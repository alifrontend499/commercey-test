import React from 'react'

export default function FormProduct__Price(props) {
    return (
        <React.Fragment>
            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.costPrice && props.formik.errors.costPrice) ? "has-msg msg-error" : ""}`}>
                <label>
                    Cost Price
                    {/* <span>*</span> */}
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Cost Price"
                        id="costPrice"
                        {...props.formik.getFieldProps('costPrice')} />
                    {
                        /* form message */
                        (props.formik.touched.costPrice && props.formik.errors.costPrice) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.costPrice}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.price && props.formik.errors.price) ? "has-msg msg-error" : ""}`}>
                <label>
                    Price
                    <span>*</span>
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Price"
                        id="price"
                        {...props.formik.getFieldProps('price')} />
                    {
                        /* form message */
                        (props.formik.touched.price && props.formik.errors.price) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.price}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* form field */}
            <div className={`st-form st-form-with-label-left d-flex flex-wrap align-items-center ${(props.formik.touched.promoPrice && props.formik.errors.promoPrice) ? "has-msg msg-error" : ""}`}>
                <label>
                    Promo Price
                    {/* <span>*</span> */}
                </label>
                <div className="media-body st-form-input-container">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Promo Price"
                        id="promoPrice"
                        {...props.formik.getFieldProps('promoPrice')} />
                    {
                        /* form message */
                        (props.formik.touched.promoPrice && props.formik.errors.promoPrice) && (
                            <div className="st-form-msg position-absolute">
                                <p className="st-fs-12">{props.formik.errors.promoPrice}</p>
                            </div>
                        )
                    }
                </div>
            </div>

        </React.Fragment>
    )
}
